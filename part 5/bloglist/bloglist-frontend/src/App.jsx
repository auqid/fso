import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  console.log(password, username);
  console.log(user);
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedBlogUser) {
      const user = JSON.parse(loggedBlogUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const blogRef = useRef();
  console.log(blogs);
  // const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  console.log(user);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setError("Invalid Credentials");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };
  const handleSave = async (noteObject) => {
    blogRef.current.toggle();
    try {
      const newBlog = await blogService.create(noteObject);
      console.log("New blog created:", newBlog);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setSuccess(`A new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setError("Failed to create blog");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  const updateBlog = async (id, formvalues) => {
    try {
      console.log("Updating blog with ID:", id, "and values:", formvalues);
      const updatedBlog = await blogService.update(id, formvalues);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setSuccess(`Blog ${updatedBlog.title} updated successfully`);
    } catch (error) {
      console.log(error);
      setError("Failed to update blog");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      console.log("Deleting blog with ID:", id);
      await blogService.deleteBlog(id);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setSuccess("Blog deleted successfully");
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.log(error);
      setError("Failed to delete blog");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {success && <div className="success">{success}</div>}
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <br />
      <br />
      <Togglable buttonLabel="new blog" ref={blogRef}>
        <BlogForm handleSave={handleSave} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );

  return (
    <>
      {error}
      {user === null ? loginForm() : blogList()}
    </>
  );
};

export default App;
