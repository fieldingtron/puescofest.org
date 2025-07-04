const { Resend } = require("resend");

// Email configuration
const EMAIL_CONFIG = {
  subject: process.env.EMAIL_SUBJECT || "PuescoFest Website Contact Form",
  fromEmail: process.env.FROM_EMAIL || "no-reply@onresend.com",
  toEmail: process.env.TO_EMAIL || "festivalpuesco@gmail.com",
};

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to create email content
const createEmailContent = (name, email, message) => {
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
    <div>${name}</div>
  </div>
  <div class="field">
    <div class="label">Email:</div>
    <div>${email}</div>
  </div>
  <div class="field">
    <div class="label">Message:</div>
    <div class="message">${message.replace(/\n/g, "<br/>")}</div>
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
    } = JSON.parse(event.body);

    console.log("[Email Function] Parsed form data:", {
      name,
      email,
      messageLength: message?.length,
      hasHoneypot: !!honeypot,
    });

    // Check honeypot field
    if (honeypot) {
      console.log("[Email Function] Spam detected via honeypot");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Spam detected" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

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
