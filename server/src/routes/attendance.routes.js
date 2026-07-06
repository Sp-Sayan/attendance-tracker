import express from "express";

import {
    createAttendanceSession,
    markAttendance,
    endAttendanceSession,
    fetchActiveAttendanceSession,
} from "../controllers/attendance.controller.js";

import {
    protectRoute,
    userIsTeacher,
} from "../middleware/auth.middleware.js";
import { isSameTeacherAsCreator, validateOtp } from "../middleware/attendance.middleware.js";

const router = express.Router();


router.post(
    "/create-session",
    protectRoute,
    userIsTeacher,
    isSameTeacherAsCreator,
    createAttendanceSession,
);



router.post(
    "/mark",
    protectRoute,
    validateOtp,
    markAttendance,
);


router.patch(
    "/end-session/:sessionId",
    protectRoute,
    userIsTeacher,
    //TODO - Add isSameTeacherAsCreator middleware
    endAttendanceSession,
);

router.get(
    "/active-session",
    protectRoute,
    userIsTeacher,
    fetchActiveAttendanceSession,
);


// router.post(
//     "/generate-report",
//     protectRoute,
//     userIsTeacher,
//     generateAttendanceReport,
// );



// router.get(
//     "/sessions",
//     protectRoute,
//     userIsTeacher,
//     fetchAttendanceSessions,
// );



// router.get(
//     "/student",
//     protectRoute,
//     fetchStudentAttendance,
// );

export default router;