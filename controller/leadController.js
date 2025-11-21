import Lead from "../model/Lead.js";
import { sendEmail } from "../utils/emailSender.js"; // SendGrid setup

// Send waitlist email using verified SendGrid sender
const sendWaitlistEmail = async (email, firstName) => {
  const subject = "Welcome to Kongila Waitlist!";
  const html = `<p>Hi ${firstName},</p>
                <p>Thank you for signing up for the Kongila waitlist!
                   We're thrilled to have you as part of our community.
                   We are working hard to connect top professional talents with leading companies,
                   and you'll be the first to know about exclusive updates, opportunities,
                   and our official launch. 🚀
                </p>
                <p>— The Kongila Team</p>`;

  try {
    await sendEmail(email, subject, html);
    console.log(`Waitlist email sent to ${email}`);
  } catch (err) {
    console.error(`Failed to send waitlist email to ${email}:`, err);
  }
};

export const createLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      companySector,
      userType,
      // Employer fields
      companyName,
      companySize,
      hiringTimeline,
      // Talent fields
      phoneCode,
      phoneNumber,
      competency,
      role,
      whatsappUpdates,
    } = req.body;

    // Save lead to DB
    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      country,
      companySector,
      userType,
      companyName,
      companySize,
      hiringTimeline,
      phoneCode,
      phoneNumber,
      competency,
      role,
      whatsappUpdates,
    });

    // Send welcome email asynchronously using SendGrid
    sendWaitlistEmail(email, firstName);

    res.status(201).json({ message: "Lead saved and email sent", lead });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};
