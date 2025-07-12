import React from "react";

const BlogList = () => {
  return (
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
};

export default BlogList;
