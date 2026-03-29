import nodemailer from "nodemailer";

const buildHtml = (verificationUrl, email) => `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="text-align: center; color: #333;">Verify Your Email Address</h2>
    <p style="text-align: center;">
      <img src="https://res.cloudinary.com/shubham-node/image/upload/v1716641361/Screenshot_2024-05-25_at_6.18.57_PM_rx6xei.png" alt="${process.env.EMAIL_FROM_NAME} Logo" style="width: 200px; margin-bottom: 20px;">
    </p>
    <p>Hello,</p>
    <p>Thank you for registering with ${process.env.EMAIL_FROM_NAME}. Please click the button below to verify your email address and activate your account:</p>
    <p style="text-align: center;">
      <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
    </p>
    <p>If the button above does not work, copy and paste the following link into your web browser:</p>
    <p style="word-break: break-word;">${verificationUrl}</p>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Thank you,<br>${process.env.EMAIL_FROM_NAME} Team</p>
    <hr>
    <p style="font-size: 12px; color: #666; text-align: center;">
      This email was sent to ${email}. If you have any questions, please contact us at <a href="mailto:our.chatsphere@gmail.com">our.chatsphere@gmail.com</a>.
    </p>
  </div>
</div>`;

// ── Brevo HTTP API (works on Render free tier — no SMTP ports needed) ──
const sendViaBrevoApi = async (email, subject, html) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("Missing BREVO_API_KEY env var");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: process.env.EMAIL_FROM_NAME, email: process.env.SMTP_EMAIL },
      to: [{ email }],
      subject,
      htmlContent: html,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo API ${res.status}: ${body}`);
  }

  const data = await res.json();
  console.log(`Email sent via Brevo API to ${email}:`, data);
  return data;
};

// ── Nodemailer SMTP (works locally / when SMTP ports are open) ──
const sendViaSmtp = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const result = await transporter.sendMail({
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject,
    html,
  });

  console.log(`Email sent via SMTP to ${email}: messageId=${result.messageId}`);
  return result;
};

// ── Main entry point: use Brevo API if key exists, else fall back to SMTP ──
const sendEmail = async (email, subject, verificationUrl) => {
  const html = buildHtml(verificationUrl, email);

  try {
    if (process.env.BREVO_API_KEY) {
      return await sendViaBrevoApi(email, subject, html);
    }
    return await sendViaSmtp(email, subject, html);
  } catch (error) {
    console.error(`Error sending mail to ${email}:`, error);
    throw error;
  }
};

export default sendEmail;