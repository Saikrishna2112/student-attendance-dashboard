// Filename: seed09A.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student");
const Teacher = require("./models/Teacher");

dotenv.config();

const students_09A = [
  { name: "John Doe", rollNumber: "01", className: "09A" },
  { name: "Sarah Smith", rollNumber: "02", className: "09A" },
  { name: "Michael Johnson", rollNumber: "03", className: "09A" },
  { name: "Emily Davis", rollNumber: "04", className: "09A" },
  { name: "David Wilson", rollNumber: "05", className: "09A" },
  { name: "Emma Brown", rollNumber: "06", className: "09A" },
  { name: "Daniel Miller", rollNumber: "07", className: "09A" },
  { name: "Sophia Taylor", rollNumber: "08", className: "09A" },
  { name: "James Anderson", rollNumber: "09", className: "09A" },
  { name: "Olivia Thomas", rollNumber: "10", className: "09A" },
  { name: "Liam Martinez", rollNumber: "11", className: "09A" },
  { name: "Ava Hernandez", rollNumber: "12", className: "09A" },
  { name: "Noah Lopez", rollNumber: "13", className: "09A" },
  { name: "Isabella Gonzalez", rollNumber: "14", className: "09A" },
  { name: "Mason Perez", rollNumber: "15", className: "09A" }
];

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    // Find Teacher 1
    const teacher = await Teacher.findOne({ email: "teacher1@example.com" });
    if (!teacher) {
      console.log("❌ Teacher 'teacher1@example.com' not found.");
      process.exit();
    }

    // Optional: Clear existing 09A students before seeding
    await Student.deleteMany({ className: "09A", teacher: teacher._id });
    console.log("Cleared existing 09A students.");

    console.log("Teacher found:", teacher.name);

    // Attach teacher ID to all students
    const studentsWithTeacher = students_09A.map((s) => ({
      ...s,
      teacher: teacher._id
    }));

    await Student.insertMany(studentsWithTeacher);

    console.log("🎉 Students for 09A added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding students:", error.message);
    process.exit(1);
  }
};

seedStudents();