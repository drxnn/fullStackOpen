import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NewBlog from "./components/newBlog";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorStyle, setErrorStyle] = useState("");

  blogs.sort((a, b) => b.likes - a.likes);

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
  console.log(blogs);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setErrorMessage("Successful log in");
      setErrorStyle("success");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setErrorStyle("error");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  // const handleUserNameChange = (e) => {
  //   setUsername(e.target.value);
  // };
  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       Username
  //       <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       Password
  //       <input
  //         type="password"
  //         value={password}
  //         name="Password"
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //     </div>
  //     <button type="submit"> login </button>
  //   </form>
  // );

  // logic for blog likeD:
  const likeHandler = async (blogInfo) => {
    // e.preventDefault();
    try {
      const response = await blogService.blogLiked(blogInfo);
      const updatedBlog = response.data;
      setBlogs(blogs.map((b) => (b.id === blogInfo.id ? updatedBlog : b)));
    } catch (error) {
      console.error(error);
    }
  };

  // logic for deleting blog:
  const deleteBlogHandler = async (blogInfo) => {
    // e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
      return;
    }
    try {
      blogService.setToken(user.token);
      console.log("blogs before", blogs);
      await blogService.deleteBlog(blogInfo);

      console.log("Blog deletion completed");

      const updatedBlogs = blogs.filter((b) => b.id !== blogInfo.id);
      setBlogs(updatedBlogs);
      console.log("After deletion, blogs:", updatedBlogs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Notification notification={errorMessage} style={errorStyle} />
      {!user && (
        <div>
          {" "}
          <h2>Log in to application</h2>
          {
            <LoginForm
              handleSubmit={handleLogin}
              setPassword={setPassword}
              setUsername={setUsername}
              username={username}
              password={password}
            />
          }
        </div>
      )}
      {user && (
        <div>
          {user.name} logged in
          <button onClick={() => logOut()}>log out</button>
          <Togglable buttonLabel="new blog">
            <NewBlog
              setErrorStyle={setErrorStyle}
              setErrorMessage={setErrorMessage}
              user={user}
            />
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => {
        console.log(blog);
        return (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLikeBlog={likeHandler}
            handleDeleteBlog={deleteBlogHandler}
          />
        );
      })}
    </div>
  );
};

export default App;
