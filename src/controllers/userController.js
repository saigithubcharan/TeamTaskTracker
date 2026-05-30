const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  createUserSchema
} = require(
  "../validations/userValidation"
);

const createUser = async (req, res) => {
  try {
    const { error } =
  createUserSchema.validate(
    req.body
  );

if (error) {

  return res.status(400).json({
    status: 400,
    code:
      "VALIDATION_ERROR",
    message:
      error.details[0].message
  });

}

    const {
      name,
      email,
      password,
      role
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: 400,
        code: "USER_EXISTS",
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        organizationId:
          req.user.organizationId
      });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }
};

const getUsers = async (req, res) => {
  try {

    const users =
      await User.find({
        organizationId:
          req.user.organizationId
      }).select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }
};
const getUserById = async (req, res) => {
  try {

    const user =
      await User.findOne({
        _id: req.params.id,
        organizationId:
          req.user.organizationId
      }).select("-password");

    if (!user) {
      return res.status(404).json({
        status: 404,
        code: "USER_NOT_FOUND",
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }
};
const updateUser = async (req, res) => {

  try {

    const user =
      await User.findOneAndUpdate(
        {
          _id: req.params.id,
          organizationId:
            req.user.organizationId
        },
        req.body,
        {
          new: true
        }
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        status: 404,
        code: "USER_NOT_FOUND",
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }

};
const deleteUser = async (req, res) => {

  try {

    const user =
      await User.findOneAndDelete({
        _id: req.params.id,
        organizationId:
          req.user.organizationId
      });

    if (!user) {
      return res.status(404).json({
        status: 404,
        code: "USER_NOT_FOUND",
        message: "User not found"
      });
    }

    res.json({
      message:
        "User deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }

};
module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};