//imports
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const { postRouter } = require("./routes/post.routes");
const { categoryRouter } = require("./routes/category.routes");
const { commentRouter } = require("./routes/comment.routes");
const { authRouter } = require("./routes/auth.routes");
const { statsRouter } = require("./routes/stats.routes");
const cors = require("cors");

// Read the two frontend urls from env
const allowedOrigins = [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2];

// Enable CORS for allowed frontends
app.use(
  cors({
    origin: allowedOrigins,
  }),
);

// for form handling in controller
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/posts/:postId/comments", commentRouter);
app.use("/comments", commentRouter);
app.use("/auth", authRouter);
app.use("/stats", statsRouter);

// error 404 route
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

//listener
app.listen(port, () => {
  console.log(`Notes - a personal blog app ${port}`);
});
