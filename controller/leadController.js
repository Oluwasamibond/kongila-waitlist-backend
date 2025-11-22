import Lead from "../model/Lead.js";
import { sendEmail } from "../utils/emailSender.js";

// Send welcome email after signing up
const sendWaitlistEmail = async (email, fullName) => {
  const firstName = fullName?.split(" ")[0] || fullName;

  const subject = "Welcome to Kongila Waitlist!";
  const html = `
    <p>Hi ${firstName},</p>
    <p>Thank you for signing up for the Kongila waitlist!
       We're thrilled to have you as part of our community.
       We are committed to connecting top professional talents with leading global companies,
       and you'll be the first to know about exclusive updates, opportunities,
       and our official launch. 🚀
    </p>
    <p>— The Kongila Team</p>
  `;

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
      userType,

      // Talent fields
      fullName,
      email,
      phone,
      country,
      skillset,
      professionalLevel,
       preferredRole,

      // Employer fields
      companyName,
      industry,
      companySize,
      headquarters,
      website,

      contactName,
      contactJobTitle,
      contactEmail,
      contactPhone,

      engagementType,
      rolesAndSkills,
      numberOfTalents,
      experienceLevel,
      preferredTimezone,
      hiringTimeline,
    } = req.body;

    // Basic validation
    if (!userType) {
      return res.status(400).json({ message: "userType is required" });
    }

    if (userType === "Talent") {
      if (!fullName || !email || !phone || !country || !skillset || !professionalLevel || !preferredRole) {
        return res.status(400).json({ message: "Missing required Talent fields" });
      }
    }

    if (userType === "Employer") {
      if (!companyName || !industry || !companySize || !contactEmail) {
        return res.status(400).json({ message: "Missing required Employer fields" });
      }
    }

    // Save lead to DB
    const lead = await Lead.create({
      userType,

      // Talent
      fullName,
      email,
      phone,
      country,
      skillset,
      professionalLevel,
      preferredRole,

      // Employer
      companyName,
      industry,
      companySize,
      headquarters,
      website,

      contactName,
      contactJobTitle,
      contactEmail,
      contactPhone,

      engagementType,
      rolesAndSkills,
      numberOfTalents,
      experienceLevel,
      preferredTimezone,
      hiringTimeline,
    });

    // Send welcome email asynchronously
    sendWaitlistEmail(email, fullName);

    res.status(201).json({
      message: "Lead saved and welcome email sent",
      lead,
    });
  } catch (error) {
    console.error("Lead creation failed:", error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};
