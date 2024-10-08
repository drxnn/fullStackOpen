const Blog = require("../models/blogs");
const User = require("../models/users");
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
// const { response } = require("express");
const logger = require("../utils/logger");

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

blogsRouter.post("/resetBlogs", async (req, res, next) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ error: "Forbidden in production" });
  }

  try {
    await Blog.find({}).deleteMany();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// update information about a specific blog
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    let blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    const blogUpdated = {
      ...blog.toObject(),
      likes: blog.likes + 1,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogUpdated,
      {
        new: true,
      }
    ).populate("user", { blogs: 0 });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = middleware.tokenExtractor(request, response, next);

    console.log("token is", token);

    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log("decoded token is", decodedToken);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    let blog = await Blog.findById(request.params.id);
    let user = await User.findById(decodedToken.id);

    if (!blog) return response.status(400).send({ error: "Not found" });

    if (blog.user.equals(user._id)) {
      console.log("it matches");

      await Blog.findByIdAndDelete(request.params.id);
      const blogs = await Blog.find({});

      return response.status(200).json(blogs);
    } else {
      response.status(401).send("not authorized");
    }
  } catch (error) {
    console.error(error);
  }
});

blogsRouter.put("/:id/comments", async (req, res, next) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).send({ error: "comment needs to be provided" });
  }

  console.log("params", req.params.id);

  console.log(req.body);
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { comments: blog.comments ? blog.comments.concat(comment) : [comment] },
      { new: true }
    );

    // const blogs = await Blog.find({});

    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  console.log(request.body);
  if (!request.body.likes) {
    request.body.likes = 0;
  }
  const token = middleware.tokenExtractor(request, response, next);
  console.log("this is the token", token);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const { title, author, url, likes } = request.body;
  const user = await User.findById(decodedToken.id);
  console.log("heres the user", user);

  if (!user) {
    return response
      .status(400)
      .json({ error: "No users found in the database" });
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
      const savedBlog = await blog.save();
      user.blogs.push(savedBlog._id);
      console.log("blog that was just created:", blog);
      await user.save();

      const blogs = await Blog.find({});
      console.log("all the blogs", blogs);
      response.status(200).send(blog);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
