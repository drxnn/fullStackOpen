import { configureStore } from "@reduxjs/toolkit";

import notificationAndStyleReducer from "./src/reducers/notificationReducer";

import blogsReducer from "./src/reducers/blogsReducer";

const store = configureStore({
  reducer: {
    notificationWithStyle: notificationAndStyleReducer,
    blogs: blogsReducer,
  },
});

export { store };
