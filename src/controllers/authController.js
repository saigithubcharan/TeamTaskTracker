const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Organization = require("../models/Organization");
const RefreshToken = require("../models/RefreshToken");

const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/generateTokens");

const {
  registerSchema
} = require("../validations/authValidation");


// REGISTER
const register = async (req, res) => {

  try {

    const { error } =
      registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: 400,
        code: "VALIDATION_ERROR",
        message: error.details[0].message
      });
    }

    const {
      name,
      email,
      password,
      organizationName
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

    const organization =
      await Organization.create({
        name: organizationName
      });

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      organizationId: organization._id
    });

    return res.status(201).json({
      message: "Admin registered successfully"
    });

  } catch (error) {

    return res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }
};


// LOGIN
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password"
      });
    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {
      return res.status(401).json({
        status: 401,
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password"
      });
    }

    const accessToken =
      generateAccessToken(user);

    const refreshToken =
      generateRefreshToken(user);

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(
        Date.now() +
        7 * 24 * 60 * 60 * 1000
      )
    });

    return res.status(200).json({
      accessToken,
      refreshToken
    });

  } catch (error) {

    return res.status(500).json({
      status: 500,
      code: "SERVER_ERROR",
      message: error.message
    });

  }

};


module.exports = {
  register,
  login
};