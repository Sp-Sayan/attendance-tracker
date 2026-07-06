import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import classroomReducer from "../slice/classroomSlice";
import attendanceReducer from "../slice/attendanceSlice";
import attendanceSessionReducer from "../slice/attendanceSessionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classroom: classroomReducer,
    attendance: attendanceReducer,
    attendanceSession: attendanceSessionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
