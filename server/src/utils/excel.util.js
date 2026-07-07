import ExcelJS from "exceljs";

export const generateAttendanceWorkbook = async (attendanceData, classCode) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(classCode);

    const fromDate = attendanceData[0].fromDate;
    const toDate = attendanceData[0].toDate;

    // ===== Title =====
    worksheet.mergeCells("A1:I1");

    const title = worksheet.getCell("A1");
    title.value = `${classCode} Attendance Report (${fromDate} to ${toDate})`;

    title.font = {
        bold: true,
        size: 18,
    };

    title.alignment = {
        horizontal: "center",
        vertical: "middle",
    };
    title.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
    }


    worksheet.columns = [
        { key: "serial", width: 25 },
        { key: "institutionId", width: 20 },
        { key: "name", width: 30 },
        { key: "fromDate", width: 25 },
        { key: "toDate", width: 25 },
        { key: "present", width: 20 },
        { key: "totalSessions", width: 20 },
        { key: "attendancePercentage", width: 25 },
        { key: "status", width: 20 }
    ];

    worksheet.addRow([
        "SERIAL NUMBER",
        "INSTITUTION ID",
        "STUDENT NAME",
        "FROM DATE",
        "TO DATE",
        "ATTENDED SESSIONS",
        "TOTAL SESSIONS",
        "ATTENDANCE PERCENTAGE",
        "STATUS",
    ]);

    worksheet.addRows(attendanceData);

    worksheet.eachRow((row) => {
        row.eachCell((cell) => {
            cell.alignment = {
                vertical: "middle",
                horizontal: "center",
            };
        });
    });

    const headerRow = worksheet.getRow(2);

    headerRow.font = {
        bold: true,
    };
    headerRow.eachCell((cell) => {
        cell.border = {
            top: { style: "medium" },
            left: { style: "medium" },
            bottom: { style: "medium" },
            right: { style: "medium" },
        };
    });
    const totalRows = worksheet.rowCount;
    const totalCols = worksheet.columnCount;

    for (let row = 3; row <= totalRows; row++) {
        for (let col = 1; col <= totalCols; col++) {
            const cell = worksheet.getCell(row, col);

            const border = {};

            // Top edge
            if (row === 1) border.top = { style: "medium" };

            // Bottom edge
            if (row === totalRows) border.bottom = { style: "medium" };

            // Left edge
            if (col === 1) border.left = { style: "medium" };

            // Right edge
            border.right = { style: "medium" };

            cell.border = border;
        }
    }
    return workbook;
}