import { axiosInstance } from "@/lib/axios";
import { AttendanceState } from "@/types/attendance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState: AttendanceState = {
  activeSession: null,
  isCreatingSession: false,
  isMarking: false,
  isEnding: false,
  error: null,
};

// 1. Create Attendance Session (Teacher)
export const createAttendanceSession = createAsyncThunk(
  "attendance/createAttendanceSession",
  async (
    data: { classId: string; otp: string; roomNumber: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        "/attendance/create-session",
        data,
      );
      Toast.show({
        type: "success",
        text1: "Attendance session enabled successfully! 📡",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create attendance session";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  },
);

// 2. Mark Attendance (Student)
export const markAttendance = createAsyncThunk(
  "attendance/markAttendance",
  async (
    data: { classId: string; otp: string; roomNumber: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post("/attendance/mark", data);
      Toast.show({
        type: "success",
        text1: "Attendance marked successfully! 🎉",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to mark attendance";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  },
);

// 3. End Attendance Session (Teacher)
export const endAttendanceSession = createAsyncThunk(
  "attendance/endAttendanceSession",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/attendance/end-session/${sessionId}`,
      );
      Toast.show({
        type: "success",
        text1: "Attendance session ended successfully! 🛑",
      });
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to end attendance session";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  },
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearActiveSession: (state) => {
      state.activeSession = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Session
      .addCase(createAttendanceSession.pending, (state) => {
        state.isCreatingSession = true;
        state.error = null;
      })
      .addCase(createAttendanceSession.fulfilled, (state, action) => {
        state.isCreatingSession = false;
        state.activeSession = action.payload?.session || null;
      })
      .addCase(createAttendanceSession.rejected, (state, action) => {
        state.isCreatingSession = false;
        state.error = action.payload as string;
      })
      // Mark Attendance
      .addCase(markAttendance.pending, (state) => {
        state.isMarking = true;
        state.error = null;
      })
      .addCase(markAttendance.fulfilled, (state) => {
        state.isMarking = false;
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.isMarking = false;
        state.error = action.payload as string;
      })
      // End Session
      .addCase(endAttendanceSession.pending, (state) => {
        state.isEnding = true;
        state.error = null;
      })
      .addCase(endAttendanceSession.fulfilled, (state) => {
        state.isEnding = false;
        state.activeSession = null;
      })
      .addCase(endAttendanceSession.rejected, (state, action) => {
        state.isEnding = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearActiveSession } = attendanceSlice.actions;
export default attendanceSlice.reducer;
