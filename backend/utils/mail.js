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

const sendContactMail = async ({ to, subject, text, html }) => {
  const info = await transporter.sendMail({
    from: `"Jobboard" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html
  });
  return info;
};

module.exports = { sendContactMail, transporter };
