import Togglable from "./Togglable";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const likeHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await blogService.blogLiked(blog);
      const updatedBlog = response.data;
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    // If the user cancels, do nothing
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
    <div className={"blogDivStyle"}>
      <p>{blog.title} </p>
      <Togglable buttonLabel="view">
        <p>
          {blog.url} <br /> likes: {blog.likes}{" "}
          <button onClick={likeHandler}>like</button> <br /> {blog.author}{" "}
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
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
};

export default Blog;
