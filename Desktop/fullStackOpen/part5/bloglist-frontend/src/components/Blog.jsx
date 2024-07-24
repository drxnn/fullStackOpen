import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const likeHandler = async (e) => {
    e.preventDefault();
    await blogService.blogLiked(blog);
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
