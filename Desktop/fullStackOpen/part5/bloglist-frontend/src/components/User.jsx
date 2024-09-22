import React from "react";

const User = ({ user }) => {
  if (!user) {
    return <div> no user </div>;
  }
  //   console.log(user);
  console.log(user);
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
