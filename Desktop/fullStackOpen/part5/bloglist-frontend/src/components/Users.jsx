import React from "react";

const Users = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>No users found</div>; // Handle empty or undefined users gracefully
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
          <span>Name: {u.name}</span> <br />
          <br />
          <span>Number of blogs: {u.blogs.length}</span>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Users;
