import React from "react";
import { useParams } from "react-router-dom";

const User = ({ users }) => {
  const id = useParams().id;
  const user = users.find((u) => u.id == id);

  if (!{ user }) {
    return <div> no user </div>;
  }
  console.log(user);
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
