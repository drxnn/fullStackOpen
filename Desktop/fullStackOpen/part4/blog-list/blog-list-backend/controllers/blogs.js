const Blog = require("../models/blogs");
const User = require("../models/users");
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

// blogsRouter.use(middleware.tokenExtractor);

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
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
  try {
    const token = request.token;

    console.log("token is", token);

    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log("decoded token is", decodedToken);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    let blog = await Blog.findById(request.params.id);
    let user = await User.findById(decodedToken.id);

    if (blog.user.equals(user._id)) {
      console.log("it matches");

      await Blog.findByIdAndDelete(request.params.id);
    }
  } catch (error) {
    console.error(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  console.log(request.body);
  if (!request.body.likes) {
    request.body.likes = 0;
  }
  const token = request.token;
  console.log("this is the token", token);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const { title, author, url, likes } = request.body;
  const user = await User.findById(decodedToken.id);

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
