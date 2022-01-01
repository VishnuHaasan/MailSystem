const mongoose = require("mongoose")

const MailSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  content: {
    type: String
  }
},{timestamps: true})

module.exports = mongoose.model("MailModel",MailSchema)