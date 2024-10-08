import { useState, useEffect } from "react";

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
  // BrowserRouter as Router,
  Link,
  // useNavigate,
  useMatch,
  // useParams,
  Navigate,
} from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
// import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Home from "./components/Home";

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
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const match = useMatch("/users/:id");
  const individualUserInfo =
    match && allUsers?.length
      ? allUsers.find((u) => u.id === match.params.id)
      : null;

  const blogMatch = useMatch("/blogs/:id");

  const individualBlogInfo =
    blogMatch && sortedBlogs
      ? sortedBlogs.find((b) => b.id === blogMatch.params.id)
      : null;

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
        <Link to="/users" style={{ padding: 5 }}>
          Users
        </Link>
        <Link to="/blogs" style={{ padding: 5 }}>
          Blogs
        </Link>
        <Link to="/" style={{ padding: 5 }}>
          {" "}
          Home
        </Link>
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
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/blogs"
          element={
            <>
              <h2>blogs</h2>
              {!individualBlogInfo &&
                sortedBlogs.map((b) => {
                  return (
                    <li key={b.id}>
                      <Link to={`/blogs/${b.id}`}>{b.title}</Link>;
                    </li>
                  );
                })}
            </>
          }
        ></Route>
        <Route
          path="/users"
          element={
            user ? <Users users={allUsers} /> : <Navigate replace to="/login" />
          }
        ></Route>
        <Route
          path="/users/:id"
          element={<User user={individualUserInfo} />}
        ></Route>
        <Route
          path="blogs/:id"
          element={
            <Blog
              blog={individualBlogInfo}
              user={user}
              handleDeleteBlog={deleteBlogHandler}
              handleLikeBlog={likeHandler}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
