import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NewBlog from "./components/newBlog";
import LoginForm from "./components/LoginForm";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationAndStyleWithTimeout } from "./reducers/notificationReducer";
import {
  allBlogs,
  createBlogThunk,
  initializeBlogs,
} from "./reducers/blogsReducer";
import { addUser, initializeUsers } from "./reducers/userReducer";

import {
  Routes,
  Route,
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import Users from "./components/Users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const user = useSelector((state) => state.user.currentUser);
  const allUsers = useSelector((state) => state.user.allUsers);
  console.log(allUsers);

  const blogs = useSelector((state) => state.blogs);
  console.log(blogs);
  const notification = useSelector(
    (state) => state.notificationWithStyle.message
  );
  console.log(notification);
  const notificationStyle = useSelector(
    (state) => state.notificationWithStyle.style
  );
  const dispatch = useDispatch();

  //sort blogs
  [...blogs].sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    JSON.parse(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(addUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);
  console.log(blogs);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(addUser(user));
      setUsername("");
      setPassword("");

      dispatch(
        setNotificationAndStyleWithTimeout("Successful log in", "success", 3000)
      );
    } catch (exception) {
      dispatch(
        setNotificationAndStyleWithTimeout("wrong credentials", "error", 3000)
      );
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(addUser(null));
  };

  const likeHandler = async (blogInfo) => {
    try {
      const response = await blogService.blogLiked(blogInfo);
      console.log(response);
      const updatedBlog = response.data;
      const blogsUpdated = blogs.map((b) =>
        b.id === blogInfo.id ? updatedBlog : b
      );
      dispatch(allBlogs(blogsUpdated));
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
      dispatch(allBlogs(updatedBlogs));
      console.log("After deletion, blogs:", updatedBlogs);
    } catch (error) {
      console.error(error);
    }
  };

  //logic for new blog:
  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      blogService.setToken(user.token);

      dispatch(createBlogThunk(newBlog));
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      dispatch(
        setNotificationAndStyleWithTimeout(
          "Blog successfully created",
          "success",
          3000
        )
      );
    } catch (error) {
      dispatch(
        setNotificationAndStyleWithTimeout(
          "Blog failed to create",
          "error",
          3000
        )
      );
    }
  };

  return (
    <div>
      <div>
        <Link to="/users">Users</Link>
      </div>

      <Notification notification={notification} style={notificationStyle} />
      {!user && (
        <div>
          {" "}
          <h2>Log in to application</h2>
          <LoginForm
            handleSubmit={handleLogin}
            setPassword={setPassword}
            setUsername={setUsername}
            username={username}
            password={password}
          />
        </div>
      )}

      {user && (
        <div>
          {user.name} logged in
          <button onClick={() => logOut()}>log out</button>
          <Togglable buttonLabel="new blog">
            <NewBlog
              handleNewBlog={handleNewBlog}
              setNewBlog={setNewBlog}
              newBlog={newBlog}
            />
          </Togglable>
        </div>
      )}

      <Routes>
        <Route path="/users" element={<Users users={allUsers} />}></Route>
      </Routes>
      <h2>blogs</h2>
      {blogs.map((blog) => {
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
