import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./src/reducers/notificationReducer";
import styleReducer from "./src/reducers/styleReducer";
import blogsReducer from "./src/reducers/blogsReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    style: styleReducer,
    blogs: blogsReducer,
  },
});

export { store };
