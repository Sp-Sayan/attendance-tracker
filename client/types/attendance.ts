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
  activeSession: AttendanceSession | null;
  isCreatingSession: boolean;
  isMarking: boolean;
  isEnding: boolean;
  error: string | null;
}
