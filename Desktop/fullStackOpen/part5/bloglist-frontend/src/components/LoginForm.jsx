import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({
  handleSubmit,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        Username
        <input
          type="text"
          data-testid="username-input"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          data-testid="password-input"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit"> login </button>
    </form>
  );
};

// in order to get a warning if something is passed wrong
// LoginForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   handleUsernameChange: PropTypes.func.isRequired,
//   handlePasswordChange: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
// };

export default LoginForm;
