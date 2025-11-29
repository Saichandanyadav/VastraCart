const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    text,
    html
  };

  try {
    const info = await transporter.sendMail(msg);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('Error sending email', err);
    throw err;
  }
};

module.exports = sendEmail;
