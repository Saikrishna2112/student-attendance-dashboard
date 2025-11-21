const express = require("express");
const Attendance = require("../models/Attendance");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/attendance - Records new attendance with a duplicate check
// body: { date, className, records: [{ studentId, status }] }
router.post("/", protect, async (req, res) => {
  try {
    const { date, className, records } = req.body;
    const teacherId = req.teacher._id; // Get ID of logged-in teacher

    if (!date || !className || !records || !Array.isArray(records)) {
      return res
        .status(400)
        .json({ message: "date, className and records are required" });
    }

    // Check for duplicate attendance entry for the same date, class, and teacher
    const existingAttendance = await Attendance.findOne({
        date: new Date(date), 
        className,
        teacher: teacherId
    });

    if (existingAttendance) {
        // 409 Conflict status code is appropriate for duplicate resource creation
        return res
            .status(409) 
            .json({ message: `Attendance for class ${className} on ${date} already submitted.` });
    }
    
    // Create the new attendance record
    const attendance = await Attendance.create({
      date,
      className,
      teacher: teacherId,
      records: records.map((r) => ({
        student: r.studentId,
        status: r.status
      }))
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.error("Create attendance error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/attendance/summary?className=10A
router.get("/summary", protect, async (req, res) => {
  try {
    const { className } = req.query;

    const matchStage = { teacher: req.teacher._id };
    if (className) {
      matchStage.className = className;
    }

    const summary = await Attendance.aggregate([
      { $match: matchStage },
      { $unwind: "$records" },
      {
        $group: {
          _id: {
            className: "$className",
            date: "$date"
          },
          total: { $sum: 1 },
          presentCount: {
            $sum: {
              $cond: [{ $eq: ["$records.status", "present"] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          className: "$_id.className",
          date: "$_id.date",
          attendancePercentage: {
            $multiply: [{ $divide: ["$presentCount", "$total"] }, 100]
          }
        }
      },
      { $sort: { date: 1 } }
    ]);

    res.json(summary);
  } catch (error) {
    console.error("Summary error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;