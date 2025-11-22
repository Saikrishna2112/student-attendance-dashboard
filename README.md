```bash
📘 Student Attendance Dashboard – MERN Stack Project

A complete Student Attendance Management System built using the MERN stack
(MongoDB, Express.js, React.js, Node.js).
This project enables teachers to:

✔️ Log in securely
✔️ View students in their class
✔️ Mark attendance (Present / Absent)
✔️ View attendance summary with charts
✔️ Store and fetch attendance using MongoDB
✔️ Use clean, reusable UI components

This system is built with modularity, reusability, and real-world workflows in mind.

🌟 Features
🔐 Secure Teacher Login

JWT-based authentication

Protected frontend routes (ProtectedRoute)

Token stored in browser localStorage

📋 Student List Page

Fetch students by teacher’s class

Present/Absent toggle (white → green/red)

Clean, responsive table layout

📝 Attendance Submission

Stores attendance records in MongoDB

Groups records by date

Simple REST API design

📊 Attendance Summary

Visualized using Recharts Bar Chart

Shows attendance percentage by date

Dynamically fetched from backend

🧩 Reusable Components

Button

Card

Input

StatusButton

Navbar

ProtectedRoute

All styles organized in /styles folder

🛠 Tech Stack
Frontend

React.js, React Router, Axios, Recharts, Custom CSS.

Backend

Node.js, Express.js, Mongoose, JWT Authentication, Database MongoDB.


🔐 Authentication Flow

Teacher enters email & password

Backend validates credentials

Backend returns:

JWT token

Teacher profile (name, email, className)

Token saved in localStorage

API calls include header:

Authorization: Bearer <token>


Unauthorized users → redirected to /login




📁 Project Structure

project-root/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed09A.js
│   ├── seed10A.js
│   ├── server.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    └── vite.config.js


📌 API Endpoints
🧑‍🏫 Auth Routes
Method	Endpoint	Description
POST	/api/auth/login	Teacher Login
🎓 Student Routes
Method	Endpoint	Description
GET	/api/students?className=10A	Get all students in a class
📝 Attendance Routes
Method	Endpoint	Description
POST	/api/attendance	Submit attendance
GET	/api/attendance/summary?className=10A	Get attendance summary
⚙️ Backend Setup
1️⃣ Navigate to backend
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
MONGO_URI=mongodb://127.0.0.1:27017/attendance_db
JWT_SECRET=supersecretjwtkey
PORT=5000

4️⃣ Start backend server
npm start


Backend runs at:
👉 http://localhost:5000

🎨 Frontend Setup
1️⃣ Navigate to frontend
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev


Frontend runs at:
👉 http://localhost:5173

🧪 Database Seeding (Optional)

To insert default students:

node seed09A.js
node seed10A.js

🧩 How to Use the Application
1. Login

Enter email & password

Redirects to Student List Page

2. Mark Attendance

Present → Green button

Absent → Red button

Unselected → White

Click Submit Attendance

3. View Summary

Click Attendance Summary

Displays bar chart with date-wise data
