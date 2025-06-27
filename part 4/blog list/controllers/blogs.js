const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/hello", (request, response) => {
  response.status(200).send("<h1>hello<h1/>");
});
blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});
module.exports = blogRouter;
