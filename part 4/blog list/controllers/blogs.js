const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/hello", (request, response) => {
  response.status(200).send("<h1>hello</h1>");
});
blogRouter.get("/", async (request, response) => {
  await Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", async (request, response) => {
  const blogData = request.body;
  const blog = new Blog(blogData);

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});
module.exports = blogRouter;
