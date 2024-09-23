import { Link } from "react-router-dom";
import Togglable from "./Togglable";
// import blogService from "../services/blogs";
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

  if (!blog) return <div>no blog</div>;

  const isUserAuthorized = user?.username === blog.user?.username;

  return (
    <div className={"blogDivStyle"} data-testid="testDiv">
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <p>{blog.author} </p>
      </div>

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
    </div>
  );
};
Blog.propTypes = {
  // blog: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
};

export default Blog;
