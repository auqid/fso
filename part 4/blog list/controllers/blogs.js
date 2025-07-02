const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/hello", (request, response) => {
  response.status(200).send("<h1>hello<h1/>");
});
blogRouter.get("/", async (request, response) => {
  await Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  await blog.save().then((result) => {
    response.status(201).json(result);
  });
});
module.exports = blogRouter;
