const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  specialty: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  profilePicture: { type: String },
  biography: { type: String },
  qualifications: { type: String },
  status: { type: String, default: "active" },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
