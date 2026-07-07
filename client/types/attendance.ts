export interface AttendanceSession {
  sessionId: string;
  classId: string;
  teacherId: string;
  status: "ACTIVE" | "INACTIVE";
  otp: string;
  roomNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceState {
  isMarking: boolean;
  isGeneratingReport: boolean;
  error: string | null;
}
