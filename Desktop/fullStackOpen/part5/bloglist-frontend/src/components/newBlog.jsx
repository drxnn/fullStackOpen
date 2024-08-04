// import React, { useState } from "react";

const NewBlog = ({ handleNewBlog, setNewBlog, newBlog }) => {
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            data-testId="input-box"
            value={newBlog.title}
            name="Title"
            placeholder="input to get"
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
        <button type="submit" data-testid="submit-btn">
          {" "}
          create new blog
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
