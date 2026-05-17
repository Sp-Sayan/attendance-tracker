import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import classroomReducer from "../slice/classroomSlice";
import attendanceReducer from "../slice/attendanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classroom: classroomReducer,
    attendance: attendanceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
