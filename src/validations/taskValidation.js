const Joi = require("joi");

const createTaskSchema =
Joi.object({

  title: Joi.string()
    .required(),

  description: Joi.string()
    .allow(""),

  priority: Joi.string()
    .valid(
      "LOW",
      "MEDIUM",
      "HIGH"
    )
    .required(),

  assignee: Joi.string()
    .required(),

  dueDate: Joi.date()
    .greater("now")
    .required()

});

module.exports = {
  createTaskSchema
};