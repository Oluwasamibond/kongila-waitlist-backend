import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ["Talent", "Employer"],
      required: true,
    },

    // TALENT FIELDS
    fullName: String,
    email: String,
    phone: String,
    country: String,
    skillset: String,
    professionalLevel: String,
     preferredRole: String,

    // EMPLOYER FIELDS
    companyName: String,
    industry: String,
    companySize: String,
    headquarters: String,
    website: String,

    contactName: String,
    contactJobTitle: String,
    contactEmail: String,
    contactPhone: String,

    engagementType: [String], // Multi-select checkboxes
    rolesAndSkills: String,
    numberOfTalents: Number,
    experienceLevel: String,
    preferredTimezone: String,
    hiringTimeline: String,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
