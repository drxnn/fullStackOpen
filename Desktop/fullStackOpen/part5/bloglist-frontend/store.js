import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./src/reducers/notificationReducer";
import styleReducer from "./src/reducers/styleReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    style: styleReducer,
  },
});

export { store };
