import { React, useState } from "react";

const BlogForm = ({ handleSave }) => {
  const [blogForm, setBlogForm] = useState({
    title: "",
    author: "",
    url: "",
  });
  const createBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: blogForm.title,
      author: blogForm.author,
      url: blogForm.url,
    };
    handleSave(newBlog);
    // Reset the form fields after saving
    setBlogForm({
      title: "",
      author: "",
      url: "",
    });
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        title
        <input
          type="text"
          placeholder="Title"
          value={blogForm.title}
          onChange={(event) =>
            setBlogForm({ ...blogForm, title: event.target.value })
          }
        />
        author
        <input
          type="text"
          placeholder="Author"
          value={blogForm.author}
          onChange={(event) =>
            setBlogForm({ ...blogForm, author: event.target.value })
          }
        />
        url
        <input
          type="text"
          placeholder="URL"
          value={blogForm.url}
          onChange={(event) =>
            setBlogForm({ ...blogForm, url: event.target.value })
          }
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
