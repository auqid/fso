const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  console.log(authorization, "authorization");
  if (authorization && authorization.startsWith("bearer ")) {
    console.log(authorization, "authorization inside if");
    return authorization.replace("bearer ", "");
  }
  return null;
};

blogRouter.get("/hello", (request, response) => {
  response.status(200).send("<h1>hello</h1>");
});

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log(request.headers, "request.headers>>>>>>");
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  console.log(decodedToken, "decodedToken");
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  console.log(body);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  await savedBlog.populate("user", { username: 1, name: 1 });
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  console.log(request.body.user.id, "request.body.user.id");
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      // user: request.body.user.id,
    },
    { new: true, runValidators: true }
  ).populate("user", { username: 1, name: 1 });
  console.log(updatedBlog, "updatedBlog");
  if (!updatedBlog) {
    return response.status(404).end();
  }

  response.json(updatedBlog);
});

module.exports = blogRouter;
