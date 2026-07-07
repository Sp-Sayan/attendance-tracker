import { findAttendanceSessionService } from "../services/attendance.service.js";
import { fetchClassById } from "../services/class.service.js";

export const validateOtp = async (req, res, next) => {
    try {
        const { classId, otp, roomNumber } = req.body;
        if (!otp || !roomNumber) {
            return res.status(400).json({ message: "OTP and Room Number are required" });
        }

        const session = await findAttendanceSessionService({
            classId,
            otp,
            roomNumber,
        });

        if (!session) {
            return res.status(400).json({ message: "Invalid OTP or Room Number. Please ensure session is active" });
        }

        //add session to request
        req.session = session;

        next();
    } catch (error) {
        console.error("Error validating OTP:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const isSameTeacherAsCreator = async (req, res, next) => {
    try {
        const { classId } = req.body;

        const classroom = await fetchClassById(classId);

        if (!classroom) {
            return res.status(404).json({ message: "Class not found" });
        }

        if (classroom.teacherId !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to modify this session" });
        }

        next();
    } catch (error) {
        console.error("Error checking teacher authorization:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}