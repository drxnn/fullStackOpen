import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogs }) => {
  const likeHandler = async (e) => {
    e.preventDefault();
    const response = await blogService.blogLiked(blog);
    const updatedBlog = response.data;
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
  };

  return (
    <div className={"blogDivStyle"}>
      <p>{blog.title} </p>
      <Togglable buttonLabel="view">
        <p>
          {blog.url} <br /> likes: {blog.likes}{" "}
          <button onClick={likeHandler}>like</button> <br /> {blog.author}
        </p>
      </Togglable>
    </div>
  );
};

export default Blog;
