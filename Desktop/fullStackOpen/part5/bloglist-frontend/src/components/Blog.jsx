const Blog = ({ blog }) => (
  <div>
    <h5>title:{blog.title} </h5>
    <p>
      {blog.url} <br /> likes: {blog.likes} <br /> {blog.author}
    </p>
  </div>
);

export default Blog;
