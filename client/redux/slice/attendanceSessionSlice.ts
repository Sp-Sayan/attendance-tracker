import { axiosInstance } from "@/lib/axios";
import { AttendanceSession } from "@/types/attendance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

export interface AttendanceSessionState {
  activeSession: AttendanceSession | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AttendanceSessionState = {
  activeSession: null,
  isLoading: false,
  error: null,
};

// 1. Create Session (Teacher)
export const createSession = createAsyncThunk(
  "attendanceSession/createSession",
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

// 2. End Session (Teacher)
export const endSession = createAsyncThunk(
  "attendanceSession/endSession",
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

// 3. Fetch Active Session (Teacher)
export const fetchActiveSession = createAsyncThunk(
  "attendanceSession/fetchActiveSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/attendance/active-session");
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch active session";
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      return rejectWithValue(errorMessage);
    }
  },
);

const attendanceSessionSlice = createSlice({
  name: "attendanceSession",
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
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeSession = action.payload?.session || null;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // End Session
      .addCase(endSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(endSession.fulfilled, (state) => {
        state.isLoading = false;
        state.activeSession = null;
      })
      .addCase(endSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Active Session
      .addCase(fetchActiveSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActiveSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeSession = action.payload || null;
      })
      .addCase(fetchActiveSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearActiveSession } = attendanceSessionSlice.actions;
export default attendanceSessionSlice.reducer;
