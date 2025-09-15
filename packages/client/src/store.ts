import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counterStore";

const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
