import Togglable from "./Togglable";
import blogService from "../services/blogs";

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
    try {
      blogService.setToken(user.token);
      await blogService.deleteBlog(blog);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={"blogDivStyle"}>
      <p>{blog.title} </p>
      <Togglable buttonLabel="view">
        <p>
          {blog.url} <br /> likes: {blog.likes}{" "}
          <button onClick={likeHandler}>like</button> <br /> {blog.author}{" "}
          <br />
          <button onClick={deleteBlog}>remove blog</button>
        </p>
      </Togglable>
    </div>
  );
};

export default Blog;
