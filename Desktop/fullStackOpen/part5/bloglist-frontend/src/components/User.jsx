import React from "react";
import { Link } from "react-router-dom";
// import { b } from "vitest/dist/chunks/suite.CcK46U-P.js";

const User = ({ user }) => {
  if (!user) {
    return <div> no user </div>;
  }
  //   console.log(user);
  console.log(user);
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Blogs added from user:</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
