import Togglable from "./Togglable";

const Blog = ({ blog }) => (
  <div className={"blogDivStyle"}>
    <p>{blog.title} </p>
    <Togglable buttonLabel="view">
      <p>
        {blog.url} <br /> likes: {blog.likes} <br /> {blog.author}
      </p>
    </Togglable>
  </div>
);

export default Blog;
