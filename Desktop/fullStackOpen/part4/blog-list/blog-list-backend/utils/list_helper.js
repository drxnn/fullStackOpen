// const colors = require("colors");
const logger = require("./logger");
const Blog = require("../models/blogs");

const dummy = (blogs) => {
  return 1;
};

// api tests helpers:

const initialBlogs = [
  {
    title: "drin",
    author: "Enzo",
    url: "www.enzo-drin",
    likes: 9999,
    id: "65fde4fbc999dad63c7f4007",
  },
  {
    title: "sarah",
    author: "Enzo",
    url: "www.enzo-sarah",
    likes: 111123,
    id: "65fde99fdf92a4705cbdb638",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

//
//
//

// function that returns total likes of all the blogs combined

const totalLikes = (blogs) => {
  if (blogs.length === 1) {
    return blogs[0].likes;
  } else if (blogs.length === 0) {
    return 0;
  }
  const likesArray = [];

  blogs.map((blog) => {
    likesArray.push(blog.likes);
  });

  const total = likesArray.reduce((acc, current) => {
    return (acc += current);
  }, 0);

  return total;
};

// function that returns the favorite blog

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const { title, author, likes } = blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  });

  return { title, author, likes };
};

// function that returns the author with most blogs:

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = {};
  blogs.forEach((element, i) => {
    authors[element.author] = (authors[element.author] || 0) + 1;
  });

  let maxNumber = -Infinity;
  let maxName = null;

  for (let name in authors) {
    if (authors.hasOwnProperty(name)) {
      const number = authors[name];
      if (number > maxNumber) {
        maxNumber = number;
        maxName = name;
      }
    }
  }
  return {
    author: maxName,
    blogs: maxNumber,
  };
};

//function for most likes:
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const { author, likes } = blogs.reduce((previous, current) => {
    return previous.likes > current.likes ? previous : current;
  });
  return { author, likes };
};

module.exports = {
  blogsInDb,
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
