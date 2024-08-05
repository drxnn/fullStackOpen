// import React, { useState } from "react";

const NewBlog = ({ handleNewBlog, setNewBlog, newBlog }) => {
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            data-testid="title-input"
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
            data-testid="author-input"
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
            data-testid="url-input"
            name="Url"
            onChange={({ target }) =>
              setNewBlog((p) => ({ ...p, url: target.value }))
            }
          />
        </div>
        <button type="submit" data-testid="submit-btn">
          {" "}
          create new blog
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
