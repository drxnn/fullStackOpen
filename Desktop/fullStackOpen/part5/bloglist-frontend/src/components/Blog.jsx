import Togglable from "./Togglable";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleLikeBlog, handleDeleteBlog }) => {
  let handleLike = (e) => {
    // e.preventDefault();
    handleLikeBlog(blog);
  };

  let handleDelete = (e) => {
    e.preventDefault();
    handleDeleteBlog(blog);
  };

  const isUserAuthorized = user?.username === blog.user?.username;

  return (
    <div className={"blogDivStyle"} data-testid="testDiv">
      <div>
        <p>
          {blog.title} <br /> {blog.author}{" "}
        </p>
      </div>
      <Togglable buttonLabel="view">
        <p>
          {blog.url} <br />{" "}
          <span data-testid="testing-likes">likes: {blog.likes} </span>{" "}
          <button onClick={handleLike} data-testid="like-btn">
            like
          </button>
          <br />
          {isUserAuthorized && (
            <button onClick={handleDelete}>remove blog</button>
          )}
        </p>
      </Togglable>
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
};

export default Blog;
