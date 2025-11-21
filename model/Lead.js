import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    // Common fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    companySector: { type: String, required: true },
    userType: { type: String, enum: ["Employer", "Talent"], required: true },

    // Employer-specific
    companyName: String,
    companySize: String,
    hiringTimeline: String,

    // Talent-specific
    phoneCode: String,
    phoneNumber: String,
    competency: String,
    role: String,
    whatsappUpdates: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
