const { Resend } = require("resend");
const { checkSpam } = require("./spam-utils");

// Email configuration
const EMAIL_CONFIG = {
  subject: process.env.EMAIL_SUBJECT || "PuescoFest Website Contact Form",
  fromEmail: process.env.FROM_EMAIL || "no-reply@onresend.com",
  toEmail: process.env.TO_EMAIL || "festivalpuesco@gmail.com",
};

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

async function verifyTurnstileToken({ token, ip }) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    return { success: false, skipped: false, errors: ["missing-secret-key"] };
  }

  if (!token) {
    return { success: false, skipped: false, errors: ["missing-input-response"] };
  }

  const payload = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (ip && ip !== "unknown") {
    payload.append("remoteip", ip);
  }

  const verifyResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    }
  );

  if (!verifyResponse.ok) {
    return {
      success: false,
      skipped: false,
      errors: [`http_${verifyResponse.status}`],
    };
  }

  const result = await verifyResponse.json();
  return {
    success: Boolean(result.success),
    skipped: false,
    errors: result["error-codes"] || [],
  };
}

/**
 * Escapes characters that are unsafe for HTML.
 * Used to sanitize user input before embedding it into the email HTML.
 */
function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, function (s) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[s];
  });
}

// Helper function to create email content
const createEmailContent = (name, email, message) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const text = `
Name: ${name}
Email: ${email}
Message:
${message}
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; }
    .message { white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="field">
    <div class="label">Name:</div>
    <div>${safeName}</div>
  </div>
  <div class="field">
    <div class="label">Email:</div>
    <div>${safeEmail}</div>
  </div>
  <div class="field">
    <div class="label">Message:</div>
    <div class="message">${safeMessage.replace(/\n/g, "<br/>")}</div>
  </div>
</body>
</html>
`;

  return { text, html };
};

exports.handler = async (event, context) => {
  console.log("[Email Function] Request received:", {
    method: event.httpMethod,
    headers: event.headers,
    path: event.path,
  });

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    console.log("[Email Function] Method not allowed:", event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  try {
    console.log("[Email Function] Parsing request body...");
    const {
      "your-name": name,
      "your-email": email,
      "your-message": message,
      honeypot,
      mathChallenge,
      turnstileToken,
      renderTimestamp,
    } = JSON.parse(event.body);

    console.log("[Email Function] Parsed form data:", {
      name,
      email,
      messageLength: message?.length,
      hasHoneypot: !!honeypot,
      hasTurnstileToken: !!turnstileToken,
      renderTimestamp,
    });

    // 1. Honeypot check - return 200 to fool bots
    if (honeypot && honeypot.trim() !== "") {
      console.warn("[Email Function] Spam detected via honeypot.");
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Message sent successfully" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // 2. Math challenge check
    const mathAnswer = parseInt(mathChallenge, 10);
    if (isNaN(mathAnswer) || mathAnswer !== 7) {
      console.warn("[Email Function] Spam detected by math challenge. Answer given:", mathChallenge);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Bot detection: Incorrect security question answer." }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // 3. URL pattern check in name
    const urlRegex = /(http:\/\/|https:\/\/|www\.)/i;
    if (urlRegex.test(name)) {
      console.warn("[Email Function] Spam detected: URL in name field.");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Bot detection: Invalid characters in name." }),
        headers: { "Content-Type": "application/json" },
      };
    }

    // 4. Multi-layered spam heuristics (gibberish, timing, email patterns, rate limit)
    const clientIp =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      event.headers["client-ip"] ||
      "unknown";

    const turnstileResult = await verifyTurnstileToken({
      token: turnstileToken,
      ip: clientIp,
    });

    if (!turnstileResult.success) {
      console.warn("[Email Function] Turnstile validation failed:", {
        errors: turnstileResult.errors,
      });
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Anti-spam verification failed",
          code: "TURNSTILE_VERIFICATION_FAILED",
          errors: turnstileResult.errors,
        }),
        headers: { "Content-Type": "application/json" },
      };
    }

    const spamResult = checkSpam({
      name,
      email,
      message,
      honeypot,
      renderTimestamp,
      ip: clientIp,
    });

    if (spamResult.isSpam) {
      console.log("[Email Function] Spam detected by heuristics:", spamResult);
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "Unable to process your request" }),
        headers: { "Content-Type": "application/json" },
      };
    }

    console.log("[Email Function] Spam check passed:", spamResult);

    // Validate required fields
    if (!name || !email || !message) {
      console.log("[Email Function] Missing required fields:", {
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message,
      });
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    console.log("[Email Function] Attempting to send email via Resend...");

    // Verify environment variables
    console.log("[Email Function] Environment check:", {
      hasResendKey: !!process.env.RESEND_API_KEY,
      fromEmail: EMAIL_CONFIG.fromEmail,
      toEmail: EMAIL_CONFIG.toEmail,
      subject: EMAIL_CONFIG.subject,
    });

    const resend = getResendClient();
    const { text, html } = createEmailContent(name, email, message);
    const emailResponse = await resend.emails.send({
      from: EMAIL_CONFIG.fromEmail,
      to: EMAIL_CONFIG.toEmail,
      subject: `${EMAIL_CONFIG.subject} - ${name}`,
      html,
      text,
      reply_to: email, // Add reply-to header
    });

    console.log("[Email Function] Email sent successfully:", emailResponse);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent successfully",
        id: emailResponse.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("[Email Function] Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
