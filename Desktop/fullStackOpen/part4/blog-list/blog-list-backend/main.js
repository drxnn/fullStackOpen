require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const Blog = require("./models/blogs");
// const colors = require("colors");

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then((response) => {
    logger.info("connected to MONGO");
  })
  .catch((err) => logger.error("mongo connection failed:", err));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// This is not in controllers because it uses the /info route
app.get("/info", async (req, res, next) => {
  try {
    const count = await Blog.countDocuments({});
    res.json(`We currently have ${count} blogs`);
  } catch (error) {
    next(error);
  }
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.tokenExtractor);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
