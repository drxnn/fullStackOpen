import { useState } from "react";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
// import blogService from "../services/blogs";
// import PropTypes from "prop-types";
import blogsService from "../services/blogs";
import { setNotificationAndStyleWithTimeout } from "../reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../reducers/blogsReducer";

const Blog = ({ blog, user, handleLikeBlog, handleDeleteBlog }) => {
  console.log(blog);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const blogs = useSelector((state) => state.blogs);
  let handleLike = (e) => {
    // e.preventDefault();
    handleLikeBlog(blog);
  };

  let handleDelete = (e) => {
    e.preventDefault();
    handleDeleteBlog(blog);
  };

  const commentHandler = async (e) => {
    // use redux later

    e.preventDefault();
    try {
      const blogWithComment = await blogsService.postComment(blog.id, comment);
      const blogsUpdated = blogs.map((b) =>
        b.id === blog.id ? blogWithComment : b
      );
      dispatch(allBlogs(blogsUpdated));

      dispatch(
        setNotificationAndStyleWithTimeout(
          "comment posted successfully!",
          "success",
          3000
        )
      );
      setComment("");
    } catch (err) {
      setNotificationAndStyleWithTimeout(err, "error", 3000);
    }
  };

  if (!blog) return <div>no blog</div>;

  const isUserAuthorized = user?.username === blog.user?.username;

  return (
    <div className={"blogDivStyle"} data-testid="testDiv">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {" "}
          <h2>{blog.title}</h2>
        </Link>

        <p>Author: {blog.author} </p>
      </div>
      <a href={blog.url.startsWith("http") ? blog.url : `http://${blog.url}`}>
        {blog.url}
      </a>{" "}
      <br />
      <span data-testid="testing-likes">likes: {blog.likes} </span>{" "}
      <button onClick={handleLike} data-testid="like-btn">
        like
      </button>
      <br />
      {isUserAuthorized && <button onClick={handleDelete}>remove blog</button>}
      {/* Leave a comment on this blog: */}
      <br />
      <Togglable buttonLabel="Click to leave a comment">
        <label htmlFor="comment"> Leave a comment below</label>
        <br />
        <textarea
          type="text"
          id="comment"
          name="comment"
          rows="3"
          cols="40"
          minLength="2"
          maxLength="150"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={(e) => commentHandler(e)}>Post comment</button>
      </Togglable>
      <div>
        Comments:
        <ul>
          {blog.comments.map((comment, i) => {
            return <li key={i}>{comment}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
Blog.propTypes = {
  // blog: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
};

export default Blog;
