// Filename: seed10A.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student");
const Teacher = require("./models/Teacher");

dotenv.config();

const students_10A = [
  { name: "Robert Green", rollNumber: "01", className: "10A" },
  { name: "Linda Hall", rollNumber: "02", className: "10A" },
  { name: "William Baker", rollNumber: "03", className: "10A" },
  { name: "Jessica King", rollNumber: "04", className: "10A" },
  { name: "Thomas Scott", rollNumber: "05", className: "10A" },
  { name: "Nancy Adams", rollNumber: "06", className: "10A" },
  { name: "Charles White", rollNumber: "07", className: "10A" },
  { name: "Maria Lewis", rollNumber: "08", className: "10A" },
  { name: "Joseph Walker", rollNumber: "09", className: "10A" },
  { name: "Laura Young", rollNumber: "10", className: "10A" },
  { name: "Kevin Carter", rollNumber: "11", className: "10A" },
  { name: "Megan Hill", rollNumber: "12", className: "10A" },
  { name: "Jason Wright", rollNumber: "13", className: "10A" },
  { name: "Ashley Nelson", rollNumber: "14", className: "10A" },
  { name: "Christopher Reed", rollNumber: "15", className: "10A" }
];

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected.");

    // Find Teacher 2
    const teacher = await Teacher.findOne({ email: "teacher2@example.com" });
    if (!teacher) {
      console.log("❌ Teacher 'teacher2@example.com' not found.");
      process.exit();
    }

    // Optional: Clear existing 10A students before seeding
    await Student.deleteMany({ className: "10A", teacher: teacher._id });
    console.log("Cleared existing 10A students.");

    console.log("Teacher found:", teacher.name);

    // Attach teacher ID to all students
    const studentsWithTeacher = students_10A.map((s) => ({
      ...s,
      teacher: teacher._id
    }));

    await Student.insertMany(studentsWithTeacher);

    console.log("🎉 Students for 10A added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding students:", error.message);
    process.exit(1);
  }
};

seedStudents();