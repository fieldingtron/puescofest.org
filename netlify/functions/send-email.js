const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

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
      fromEmail: process.env.FROM_EMAIL || "no-reply@onresend.com",
      toEmail: process.env.TO_EMAIL || "lunakayakera@gmail.com",
    });

    const emailResponse = await resend.emails.send({
      from: process.env.FROM_EMAIL || "no-reply@onresend.com",
      to: process.env.TO_EMAIL || "lunakayakera@gmail.com",
      subject: `TierraGirasol Website Contact Form ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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
