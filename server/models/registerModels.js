const mongoose = require("mongoose");

const registrantTemplate = mongoose.Schema({
  fullName: { type: String },
  program: { type: String },
  level: { type: Number },
  membershipNumber: {type: String},
  constituency: { type: String },
  phone: { type: String },
  dateOfJoining: { type: Date},
  passportPhoto: { data:Buffer, ContentType: String }
});
module.exports = mongoose.model("registeredMembers", registrantTemplate);
