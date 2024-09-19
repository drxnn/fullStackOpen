import { configureStore } from "@reduxjs/toolkit";

import notificationAndStyleReducer from "./src/reducers/notificationReducer";

import blogsReducer from "./src/reducers/blogsReducer";
import userReducer from "./src/reducers/userReducer";

const store = configureStore({
  reducer: {
    notificationWithStyle: notificationAndStyleReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

export { store };
