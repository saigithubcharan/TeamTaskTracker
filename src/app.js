const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const adminRoutes= require("./routes/adminRoutes");
const taskRoutes =require("./routes/taskRoutes");
const userRoutes =require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(errorMiddleware);

app.use(
  "/api/tasks",
  taskRoutes
);
app.use("/api/auth", authRoutes);

app.use(
  "/api/test",
  testRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);
app.use(
  "/api/users",
  userRoutes
);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Team Task Tracker API Running"
  });
});

module.exports = app;