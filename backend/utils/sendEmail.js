const nodemailer = require("nodemailer");

/**
 * Sends Verification Code Email
 * @param {string} email - user email address
 * @param {number} code - verification code to send
 */
module.exports = async (email, code) => {
  const mailOptions = {
    from: process.env.GMAIL_ADDRESS,
    to: email,
    subject: "Expenses Verification Code",
    text: `Verification code : ${code}`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  await transporter.sendMail(mailOptions);
};
