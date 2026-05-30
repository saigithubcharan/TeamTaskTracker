const mongoose = require("mongoose");

const taskSchema =
new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: String,

  priority: {
    type: String,
    enum: [
      "LOW",
      "MEDIUM",
      "HIGH"
    ],
    default: "MEDIUM"
  },

  status: {
    type: String,
    enum: [
      "TODO",
      "IN_PROGRESS",
      "IN_REVIEW",
      "DONE",
      "BLOCKED"
    ],
    default: "TODO"
  },

  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  dueDate: Date,

  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  completedAt: Date
},
{
  timestamps: true
}
);

taskSchema.index({
  status: 1
});

taskSchema.index({
  assignee: 1
});

taskSchema.index({
  dueDate: 1
});

taskSchema.index({
  assignee: 1,
  status: 1
});

module.exports =
mongoose.model(
  "Task",
  taskSchema
);