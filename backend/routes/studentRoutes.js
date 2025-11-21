const express = require("express");
const Student = require("../models/Student");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/students?className=10A
router.get("/", protect, async (req, res) => {
  try {
    const { className } = req.query;

    const filter = { teacher: req.teacher._id };
    if (className) {
      filter.className = className;
    }

    const students = await Student.find(filter).sort({ rollNumber: 1 });

    res.json(students);
  } catch (error) {
    console.error("Get students error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
