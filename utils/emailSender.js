import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(to, subject, htmlContent) {
  const msg = {
    to, // recipient
    from: process.env.SENDGRID_SENDER, // verified sender
    subject,
    html: htmlContent,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("Email sent:", response[0].statusCode);
    return response;
  } catch (err) {
    console.error("Error sending email:", err.response ? err.response.body : err);
    throw err;
  }
}
