const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: {
      name: process.env.FROM_NAME,
      email: process.env.FROM_EMAIL, 
    },
    subject,
    text,
    html,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("Email sent successfully");
    return response;
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    throw error;
  }
};

module.exports = sendEmail;
