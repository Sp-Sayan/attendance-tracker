import { axiosInstance } from "@/lib/axios";
import { AttendanceState } from "@/types/attendance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const initialState: AttendanceState = {
  isMarking: false,
  error: null,
};

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

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearActiveSession: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearActiveSession } = attendanceSlice.actions;
export default attendanceSlice.reducer;
