const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../main");
const mongoose = require("mongoose");
const helper = require("../utils/list_helper");

const Blog = require("../models/blogs");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany();
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier is named id", async () => {
  const blogs = await api.get("/api/blogs");
  const blogToCheck = blogs.body[0];
  assert(blogToCheck.hasOwnProperty("id"));
});

test("POST request works", async () => {
  const initialBlogs = await api.get("/api/blogs");

  const blogToAdd = {
    title: "The Overcoat",
    author: "Nikolai Gogol",
    url: "url.com",
    likes: 125,
  };
  await api
    .post("/api/blogs")
    .send(blogToAdd)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const updatedBlogs = await api.get("/api/blogs");

  const contents = updatedBlogs.body.map((x) => x.title);
  assert(contents.includes("The Overcoat"));
  assert.strictEqual(initialBlogs.body.length, updatedBlogs.body.length - 1);
});

test("if likes if missing from request, default value to 0", async () => {
  const blogWithoutLikes = {
    title: "The Overcoat",
    author: "Nikolai Gogol",
    url: "url.com",
  };
  await api
    .post("/api/blogs")
    .send(blogWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const updatedBlogs = await api.get("/api/blogs");
  const blogWithoutLikesUpdated = updatedBlogs.body.find(
    (x) => x.title === "The Overcoat"
  );
  assert(blogWithoutLikesUpdated["likes"] === 0);
});

test("if title or url properties are missing, respond with 400 Bad Request", async () => {
  // test case 1
  const blogWithoutTitle = {
    author: "Nikolai Gogol",
    url: "url.com",
    likes: 125,
  };
  await api.post("/api/blogs").send(blogWithoutTitle).expect(400);

  //test case 2
  const blogWithoutUrl = {
    title: "The Overcoat",
    author: "Nikolai Gogol",
    likes: 125,
  };
  await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
});

test("deleting a particular blog works", async () => {
  const initialBlogs = await api.get("/api/blogs");

  const blogToDelete = initialBlogs.body[1].id;
  console.log(blogToDelete);

  await api.delete(`/api/blogs/${blogToDelete}`);
  const blogsAfterDeletion = await api.get("/api/blogs");
  console.log(blogsAfterDeletion.body);

  assert.strictEqual(
    initialBlogs.body.length,
    blogsAfterDeletion.body.length + 1
  );
});

test("incrementing likes works", async () => {
  const initialBlogs = await api.get("/api/blogs");
  const blogToCheck = initialBlogs.body[1];
  await api.put(`/api/blogs/${blogToCheck.id}`);
  const blogsAfterUpdate = await api.get("/api/blogs");
  const blogToCheckAfterUpdate = blogsAfterUpdate.body[1];

  assert.strictEqual(blogToCheck.likes + 1, blogToCheckAfterUpdate.likes);
});

after(async () => {
  await mongoose.connection.close();
});
