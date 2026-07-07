import { axiosInstance } from "@/lib/axios";
import { AttendanceState } from "@/types/attendance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Buffer } from "buffer";

const initialState: AttendanceState = {
  isMarking: false,
  isGeneratingReport: false,
  error: null,
};

// Mark Attendance (Student)
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

export const generateAttendanceReport = createAsyncThunk(
  "attendance/exportAttendance",
  async (
    data: {
      classId: string;
      className: string;
      fromDate: string;
      toDate: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post("/attendance/export", data, {
        responseType: "arraybuffer",
      });

      const base64 = Buffer.from(response.data).toString("base64");

      const fileName = `attendance_${data.className}.xlsx`;
      const file = new File(Paths.document, fileName);
      file.write(base64, { encoding: "base64" });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri, {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          dialogTitle: "Attendance Report",
          UTI: "com.microsoft.excel.xlsx",
        });
      }

      return { fileUri: file.uri };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Export failed",
      );
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
      })
      // Generate Report
      .addCase(generateAttendanceReport.pending, (state) => {
        state.isGeneratingReport = true;
        state.error = null;
      })
      .addCase(generateAttendanceReport.fulfilled, (state) => {
        state.isGeneratingReport = false;
      })
      .addCase(generateAttendanceReport.rejected, (state, action) => {
        state.isGeneratingReport = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearActiveSession } = attendanceSlice.actions;
export default attendanceSlice.reducer;
