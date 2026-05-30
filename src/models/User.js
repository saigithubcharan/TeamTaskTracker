const mongoose = require("mongoose");

const userSchema =
new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: [
      "ADMIN",
      "MANAGER",
      "MEMBER"
    ],
    default: "MEMBER"
  },

  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  }
},
{
  timestamps: true
}
);

// userSchema.index({
//   email: 1
// });

module.exports =
mongoose.model(
  "User",
  userSchema
);