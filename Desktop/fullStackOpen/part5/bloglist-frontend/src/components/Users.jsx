import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h3>All Users:</h3>
      {users.map((u) => (
        <div
          style={{ marginTop: 5, marginBottom: 25, display: "flex", gap: 10 }}
          key={u.id}
        >
          <Link to={`/users/${u.id}`}>{u.name}</Link>
          <br />
          <span>Number of blogs: {u.blogs.length}</span>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Users;
