const express = require("express");
const app = express();
const port = 3000;

const { indexRouter } = require("./routes/index.routes");
const { postRouter } = require("./routes/post.routes");
const { categoryRouter } = require("./routes/category.routes");
const { commentRouter } = require("./routes/comment.routes");

//for form data to be accessed in the controllers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", indexRouter);
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/posts/:postId/comments", commentRouter);



app.listen(port, () => {
  console.log(`Notes - a personal blog app ${port} http://localhost:3000/`);
});
