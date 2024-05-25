const nodemailer = require("nodemailer");

module.exports = async (email, subject, verificationUrl) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      // secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log(process.env.SMTP_EMAIL,' to ',email)
    await transporter.sendMail({
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
    `
    });

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(error);
    console.error(`Error sending mail to ${email}`);
    throw error; // Re-throw the error for the calling code to handle
  }
};
