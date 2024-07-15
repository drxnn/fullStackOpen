import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    JSON.parse(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      alert("wrong credentials");
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  //handle logic for new blog creation
  const handleNewBlog = async (e) => {
    try {
      e.preventDefault();
      blogService.setToken(user.token);

      blogService.createNewBlog(newBlog);
      setErrorMessage("success");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage("failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit"> login </button>
    </form>
  );

  return (
    <div>
      <Notification notification={errorMessage} style="success" />
      {!user && (
        <div>
          {" "}
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      )}
      {user && (
        <div>
          {user.name} logged in{" "}
          <button onClick={() => logOut()}>log out</button>
          <h2>create new blog</h2>
          <form onSubmit={handleNewBlog}>
            <div>
              title:
              <input
                type="text"
                value={newBlog.title}
                name="Title"
                onChange={({ target }) =>
                  setNewBlog((p) => ({
                    ...p,
                    title: target.value,
                  }))
                }
              />
            </div>
            <div>
              author:
              <input
                type="text"
                value={newBlog.author}
                name="Author"
                onChange={({ target }) =>
                  setNewBlog((p) => ({ ...p, author: target.value }))
                }
              />
            </div>
            <div>
              url:
              <input
                type="text"
                value={newBlog.url}
                name="Url"
                onChange={({ target }) =>
                  setNewBlog((p) => ({ ...p, url: target.value }))
                }
              />
            </div>
            <button type="submit"> create new blog</button>
          </form>
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;