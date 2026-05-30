const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        status: 401,
        code: "UNAUTHORIZED",
        message: "Token missing"
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      status: 401,
      code: "INVALID_TOKEN",
      message: "Invalid token"
    });

  }
};

module.exports = authMiddleware;