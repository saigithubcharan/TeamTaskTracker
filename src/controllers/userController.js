const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createUser = async (req, res) => {
  try {

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

module.exports = {
  createUser,
  getUsers
};