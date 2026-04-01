const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

const { indexRouter } = require("./routes/index.routes");
const { postRouter } = require("./routes/post.routes");
const { categoryRouter } = require("./routes/category.routes");
const { commentRouter } = require("./routes/comment.routes");
const { authRouter } = require("./routes/auth.routes");
const { statsRouter } = require("./routes/stats.routes");
const cors = require("cors");

//for form data to be accessed in the controllers
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/posts/:postId/comments", commentRouter);
app.use("/comments", commentRouter);
app.use("/auth", authRouter);
app.use("/stats", statsRouter);

app.listen(port, () => {
  console.log(`Notes - a personal blog app ${port} http://localhost:${port}/`);
});
