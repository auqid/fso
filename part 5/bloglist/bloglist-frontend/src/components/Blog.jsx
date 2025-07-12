import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisiblity = () => {
    setVisible(!visible);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(blog.id, updatedBlog);
    console.log("Blog liked:", updatedBlog);
  };
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
      console.log("Blog deleted:", blog.id);
    }
  };
  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisiblity}> View</button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p>
          <p>added by {blog.author}</p>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
