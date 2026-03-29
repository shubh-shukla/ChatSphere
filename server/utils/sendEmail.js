import nodemailer from "nodemailer";

const sendEmail = async (email, subject, verificationUrl) => {
  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const secure = process.env.SMTP_SECURE === "true" || smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // allow self-signed certificates in some environments; set to true only for troubleshooting
        rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== "false",
      },
    });

    // Verify SMTP connection configuration early and log result (helps debugging in prod)
    try {
      await transporter.verify();
      console.log("SMTP transporter verified: host=%s port=%s secure=%s", smtpHost, smtpPort, secure);
    } catch (verifyErr) {
      console.error("SMTP transporter verification failed:", verifyErr);
      // continue to attempt sendMail so detailed error appears in logs
    }

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: subject,
      html: `
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
      </div>
    `,
    };

    // Send mail with timeout to avoid hanging in production
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutMs = process.env.SMTP_SEND_TIMEOUT_MS ? Number(process.env.SMTP_SEND_TIMEOUT_MS) : 15000;

    const result = await Promise.race([
      sendPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("SMTP sendMail timed out")), timeoutMs)),
    ]);

    console.log(`Email sent to ${email}: messageId=${result && result.messageId}`);
    return result;
  } catch (error) {
    console.error(error);
    console.error(`Error sending mail to ${email}`);
    throw error; // Re-throw the error for the calling code to handle
  }
};

export default sendEmail;