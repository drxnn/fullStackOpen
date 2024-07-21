import React, { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ setErrorMessage, setErrorStyle, user }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      blogService.setToken(user.token);

      await blogService.createNewBlog(newBlog);
      setErrorMessage("Blog successfully created");
      setErrorStyle("success");

      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage("Blog failed to create");
      setErrorStyle("error");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog((p) => ({
                ...p,
                title: target.value,
              }))
            }
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog((p) => ({ ...p, author: target.value }))
            }
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="Url"
            onChange={({ target }) =>
              setNewBlog((p) => ({ ...p, url: target.value }))
            }
          />
        </div>
        <button type="submit"> create new blog</button>
      </form>
    </div>
  );
};

export default NewBlog;
