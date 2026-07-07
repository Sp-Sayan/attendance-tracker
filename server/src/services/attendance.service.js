import prisma from "../config/prisma.js";
import { generateAttendanceWorkbook } from "../utils/excel.util.js";
import { fetchClassById } from "./class.service.js";
import { format } from "date-fns";

/* ======================================================
   CREATE ATTENDANCE SESSION
   TEACHER ENABLES ATTENDANCE
====================================================== */

export const createAttendanceSessionService = async ({
    classId,
    teacherId,
    status,
    otp,
    roomNumber,
}) => {


    const newSession =
        await prisma.attendanceSession.create({
            data: {
                classId,
                teacherId,
                status,
                otp,
                roomNumber
            },
        });

    return newSession;
};

/* ======================================================
   FIND ACTIVE SESSION USING OTP + ROOM + CLASSID
====================================================== */

export const findAttendanceSessionService =
    async ({
        classId,
        otp,
        roomNumber,
    }) => {

        const session =
            await prisma.attendanceSession.findFirst({
                where: {
                    classId,
                    otp,
                    roomNumber,
                    status: "ACTIVE",
                },
                orderBy: {
                    date: "desc"
                }
            });
        return session;
    };

/* ======================================================
   CHECK IF STUDENT ALREADY MARKED
====================================================== */

export const checkExistingAttendanceService =
    async ({
        studentId,
        sessionId,
    }) => {

        const existingAttendance =
            await prisma.attendance.findFirst({
                where: {
                    studentId,
                    sessionId,
                },
            });

        return existingAttendance;
    };

/* ======================================================
   MARK ATTENDANCE
====================================================== */

export const markAttendanceService = async ({
    studentId,
    session
}) => {

    if (session.status === "INACTIVE") {
        return {
            status: 400,
            message: "Session is already inactive"
        };
    }

    //check if student is enrolled in the class
    const isEnrolled = await prisma.userClass.findFirst({
        where: {
            userId: studentId,
            classId: session.classId
        }
    })

    if (!isEnrolled) {
        return {
            status: 400,
            message: "You are not enrolled in this class"
        };
    }

    const attendance =
        await prisma.attendance.create({
            data: {
                studentId,
                sessionId: session.sessionId
            }
        });

    return {
        status: 200,
        message: "Attendance marked successfully"
    };
};

/* ======================================================
   END ATTENDANCE SESSION
====================================================== */

export const endAttendanceSessionService =
    async (sessionId) => {

        const existingSession =
            await prisma.attendanceSession.findUnique({
                where: {
                    sessionId,
                },
            });

        if (!existingSession) {
            return {
                status: 404,
                message: "Session not found",
            };
        }

        if (existingSession.status === "INACTIVE") {
            return {
                status: 400,
                message: "Session is already inactive",
            };
        }

        const endedSession =
            await prisma.attendanceSession.update({
                where: {
                    sessionId,
                },
                data: {
                    status: "INACTIVE"
                },
            });

        return {
            status: 200,
            message: "Attendance session ended successfully",
        };
    };

// /* ======================================================
//    FETCH ALL ATTENDANCE SESSIONS
//    TEACHER DASHBOARD
// ====================================================== */

export const fetchActiveAttendanceSessionService =
    async (teacherId) => {

        const session =
            await prisma.attendanceSession.findFirst({
                where: {
                    teacherId,
                    status: "ACTIVE",
                },
            });

        return session;
    };

// /* ======================================================
//    FETCH STUDENT ATTENDANCE
// ====================================================== */

// export const fetchStudentAttendanceService =
//     async (studentId) => {

//         const attendance =
//             await prisma.attendance.findMany({
//                 where: {
//                     studentId,
//                 },

//                 orderBy: {
//                     createdAt: "desc",
//                 },
//             });

//         return attendance;
//     };

// /* ======================================================
//    GENERATE REPORT
// ====================================================== */

export const exportAttendanceService =
    async ({
        classId,
        fromDate,
        toDate,
    }) => {

        //get enrolled students
        const enrolledStudents = await prisma.userClass.findMany({
            where: {
                classId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        institutionId: true,
                        name: true
                    }
                },
                class: {
                    select: {
                        subjectCode: true
                    }
                }
            },
            orderBy: {
                user: {
                    institutionId: "asc"
                },

            }
        })



        //Get sessions
        const sessionsConducted = await prisma.attendanceSession.findMany({
            where: {
                classId,
                date: {
                    gte: new Date(fromDate),
                    lte: new Date(toDate)
                },
            },
            orderBy: {
                date: "asc"
            }
        })



        //count sessions
        const totalSessions = sessionsConducted.length;
        //get session ids
        const sessionIds = sessionsConducted.map(s => s.sessionId);
        //get class code
        const classCode = enrolledStudents[0].class.subjectCode;


        //fetch all attendance records
        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                sessionId: {
                    in: sessionIds
                }
            }
        })

        // console.log(attendanceRecords);

        //count attendance for each student
        const attendanceMap = {};

        attendanceRecords.forEach(record => {
            attendanceMap[record.studentId] =
                (attendanceMap[record.studentId] || 0) + 1;
        });

        // console.log(attendanceMap);

        //data for excel
        const report = enrolledStudents.map((student, index) => {
            const present = attendanceMap[student.user.id] || 0;

            const percentage =
                totalSessions === 0
                    ? 0
                    : (present / totalSessions) * 100;

            return {
                serial: index + 1,
                institutionId: student.user.institutionId.toString(),
                name: student.user.name,
                fromDate: format(new Date(fromDate), "dd-MM-yyyy"),
                toDate: format(new Date(toDate), "dd-MM-yyyy"),
                present,
                totalSessions,
                attendancePercentage: `${percentage.toFixed(2)}%`,
                status: percentage >= 75 ? "Eligible for CA" : "Defaulter",
            };
        });

        const workbook = await generateAttendanceWorkbook(report, classCode);

        return {
            workbook,
            classCode
        };
    };