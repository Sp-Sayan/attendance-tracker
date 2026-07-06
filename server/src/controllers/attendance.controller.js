import {
    createAttendanceSessionService,
    markAttendanceService,
    endAttendanceSessionService,
    fetchActiveAttendanceSessionService,
} from "../services/attendance.service.js";

export const createAttendanceSession = async (req, res) => {
    try {
        const { classId, otp, roomNumber } = req.body;
        const teacherId = req.user.id;

        if (!classId || !otp || !roomNumber) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const session = await createAttendanceSessionService({
            classId,
            teacherId,
            status: "ACTIVE",
            otp,
            roomNumber,
        });

        res.status(201).json({
            message: "Attendance session created successfully",
            session
        });
    } catch (error) {
        console.error("Error creating attendance session:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const markAttendance = async (req, res) => {
    try {
        const session = req.session;
        const studentId = req.user.id;

        if (!session) {
            return res.status(400).json({ message: "Invalid Session" });
        }

        const result = await markAttendanceService({
            studentId,
            session,
        });

        if (result.status && result.status !== 200) {
            return res.status(result.status).json({ message: result.message });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error marking attendance:", error);
        // Handle unique constraint violation (student already marked)
        if (error.code === 'P2002') {
            return res.status(400).json({ message: "Attendance already marked for this session" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const endAttendanceSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!sessionId) {
            return res.status(400).json({ message: "Session ID is required" });
        }

        const result = await endAttendanceSessionService(sessionId);
        res.status(result.status).json(result);
    } catch (error) {
        console.error("Error ending attendance session:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const fetchActiveAttendanceSession = async (req, res) => {
    try {
        const teacherId = req.user.id;
        const result = await fetchActiveAttendanceSessionService(teacherId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// export const generateAttendanceReport = async (req, res) => {
//     try {
//         const { fromDate, toDate } = req.body;

//         if (!fromDate || !toDate) {
//             return res.status(400).json({ message: "Please provide both fromDate and toDate" });
//         }

//         const result = await generateAttendanceReportService({ fromDate, toDate });
//         res.status(200).json(result);
//     } catch (error) {
//         console.error("Error generating report:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// export const fetchAttendanceSessions = async (req, res) => {
//     try {
//         const teacherId = req.user.id;
//         const result = await fetchAttendanceSessionsService(teacherId);
//         res.status(200).json(result);
//     } catch (error) {
//         console.error("Error fetching sessions:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };



// export const fetchStudentAttendance = async (req, res) => {
//     try {
//         const studentId = req.user.id;
//         const result = await fetchStudentAttendanceService(studentId);
//         res.status(200).json(result);
//     } catch (error) {
//         console.error("Error fetching student attendance:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };
