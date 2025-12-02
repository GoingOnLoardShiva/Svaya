import nodemailer from "nodemailer";

export async function sendOtpMail(email, otp) {
  try {
    // Create transporter using SMTP (Gmail App Password)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,            // secure port
      secure: true,         // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,      // your Gmail
        pass: process.env.EMAIL_PASS,      // your Gmail App Password
      },
    });
    // Email content
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>Your OTP Code</h2>
          <p style="font-size:16px;">Use the OTP below to verify your email:</p>
          <h1 style="font-size:32px; letter-spacing:4px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
      `,
    };
    // Send email
    await transporter.sendMail(mailOptions);
    return true;
  }
  catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email.");
  }
}
