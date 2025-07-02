const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const listHelper = require("../utils/list_helper");
const mongoose = require("mongoose");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});
test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("Total Likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  test("of a bigger list is calculated right.", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe("favorite blog", () => {
  test("when list has multiple blogs, returns the one with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };

    assert.deepStrictEqual(result, expected);
  });

  test("when list has only one blog, returns that blog", () => {
    const singleBlog = [blogs[0]];
    const result = listHelper.favoriteBlog(singleBlog);
    const expected = {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    };

    assert.deepStrictEqual(result, expected);
  });

  test("when list is empty, returns null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });

  test("when multiple blogs have same highest likes, returns one of them", () => {
    const blogsWithTie = [
      { title: "Blog A", author: "Author A", likes: 5 },
      { title: "Blog B", author: "Author B", likes: 5 },
      { title: "Blog C", author: "Author C", likes: 3 },
    ];

    const result = listHelper.favoriteBlog(blogsWithTie);

    // Should return one of the blogs with 5 likes
    assert.strictEqual(result.likes, 5);
    assert.ok(result.title === "Blog A" || result.title === "Blog B");
  });
});

test("get request to /api/blogs returns the correct amount of blog posts in json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  const blogsAfter = await Blog.find({});
  console.log(response.body, "body>>>>>");
  assert.strictEqual(response.body.length, blogsAfter.length);
});

test("Unique property of of blog is name id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((blog) => {
    assert.ok(blog.hasOwnProperty("id"));
    assert.ok(!blog.hasOwnProperty("_id"));
  });
});

test("making an HTTP POST request to the /api/blogs URL successfully creates a new blog post.", async () => {
  const blogsBefore = await Blog.find({});
  const newBlog = {
    title: "Blog A",
    author: "Author A",
    url: "http://example.com",
    // likes: 5,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  console.log(response.body);
  const blogsAfter = await Blog.find({});
  assert.strictEqual(blogsAfter.length, blogsBefore.length + 1);
  const titles = blogsAfter.map((x) => x.title);
  assert(titles.includes("Blog A"));
});

test("if likes property is missing from request, it defaults to 0", async () => {
  const newBlog = {
    title: "Blog A",
    author: "Author A",
    url: "http://example.com",
    // likes: 5,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  console.log(response.body);
  assert.strictEqual(response.body.likes, 0);
});
test("if title or url is missing it returns 400 bad request", async () => {
  const blogsBefore = await Blog.find({});
  const newBlog = {
    // title: "Blog A",
    author: "Author A",
    // url: "http://example.com",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAfter = await Blog.find({});
  assert.strictEqual(blogsAfter.length, blogsBefore.length);
});

test("succeeds with status code 204 if id is valid", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await Blog.find({});
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(!titles.includes(blogToDelete.title));
});

test("succeeds in updating a blog with valid data", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];

  const updatedData = {
    title: "Updated Title",
    author: "Updated Author",
    url: "http://updated-url.com",
    likes: 999,
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.title, "Updated Title");
  assert.strictEqual(response.body.author, "Updated Author");
  assert.strictEqual(response.body.url, "http://updated-url.com");
  assert.strictEqual(response.body.likes, 999);

  const updatedBlog = await Blog.findById(blogToUpdate.id);
  assert.strictEqual(updatedBlog.title, "Updated Title");
});

after(async () => {
  console.log("closing connection");
  const blogs = await Blog.find({});
  await mongoose.connection.close();
});
