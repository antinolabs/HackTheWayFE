import { configureStore } from "@reduxjs/toolkit";

import LayoutSlice from "./Layoutslice";

const store = configureStore({
  reducer: {
    layout: LayoutSlice,
  },
  devTools: false,
});

export default store;
