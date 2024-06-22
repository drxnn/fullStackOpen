const Blog = require("../models/blogs");
const User = require("../models/users");
const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user");
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

// update information about a specific blog
blogsRouter.put("/:id", async (request, response, next) => {
  let blog = await Blog.findById(request.params.id);
  blog = blog.toObject();

  const blogUpdated = {
    ...blog,
    likes: blog.likes + 1,
  };
  // console.log("this is the request:", request);

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogUpdated,
    {
      new: true,
    }
  );
  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.post("/", async (request, response, next) => {
  if (!request.body.likes) {
    request.body.likes = 0;
  }
  const { title, author, url, likes } = request.body;
  const user = await User.findById(request.body.userId);

  if (!user) {
    return res.status(400).json({ error: "No users found in the database" });
  }

  try {
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });
    if (!blog.title || !blog.url) {
      response.status(400).end();
    } else {
      const result = await blog.save();
      response.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
