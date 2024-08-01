import Togglable from "./Togglable";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, handleLikeBlog }) => {
  let handleLike = (e) => {
    e.preventDefault();
    handleLikeBlog(blog);
  };

  const deleteBlog = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
      return;
    }
    try {
      blogService.setToken(user.token);
      await blogService.deleteBlog(blog);
    } catch (error) {
      console.error(error);
    }
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
          {blog.url} <br /> likes: {blog.likes}{" "}
          <button onClick={handleLike} data-testid="like-btn">
            like
          </button>
          <br />
          {isUserAuthorized && (
            <button onClick={deleteBlog}>remove blog</button>
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
