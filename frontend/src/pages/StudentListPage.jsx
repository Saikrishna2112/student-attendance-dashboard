import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import StatusButton from "../components/common/StatusButton";
import { useAuth } from "../context/AuthContext";
import "../styles/studentList.css";



const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  // each student: "present" | "absent" | undefined
  const [status, setStatus] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const { teacher } = useAuth();
  const navigate = useNavigate();

  const loadStudents = async () => {
    const res = await axiosClient.get(
      `/api/students?className=${teacher.className}`
    );
    setStudents(res.data);

    // all buttons start white (no status yet)
    const initialStatus = {};
    res.data.forEach((s) => (initialStatus[s._id] = undefined));
    setStatus(initialStatus);
  };

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = (studentId, newStatus) => {
    setStatus((prev) => ({ ...prev, [studentId]: newStatus }));
  };

  const submitAttendance = async () => {
    const records = students.map((s) => ({
      studentId: s._id,
      // if never touched, treat as absent
      status: status[s._id] || "absent",
    }));

    try {
      await axiosClient.post("/api/attendance", {
        date,
        className: teacher.className,
        records,
      });
      alert("Attendance submitted successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to submit attendance. Check console for details.";
      alert(message);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        {/* LEFT: big white card with table */}
        <div className="dashboard-main-card">
          <Card>
            <h1 className="table-title">
              Mark Attendance - Class {teacher.className}
            </h1>

            <table className="students-table">
              <thead>
                <tr>
                  <th>Roll no</th>
                  <th>Name</th>
                  <th colSpan={2}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td className="cell-center">{s.rollNumber}</td>
                    <td>{s.name}</td>
                    <td className="cell-center">
                      <StatusButton
                        label="Present"
                        type="present"
                        currentStatus={status[s._id]}
                        onClick={(newStatus) =>
                          handleStatusChange(s._id, newStatus)
                        }
                      />
                    </td>
                    <td className="cell-center">
                      <StatusButton
                        label="Absent"
                        type="absent"
                        currentStatus={status[s._id]}
                        onClick={(newStatus) =>
                          handleStatusChange(s._id, newStatus)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="submit-row">
              <Button onClick={submitAttendance}>Submit Attendance</Button>
            </div>
          </Card>
        </div>

        {/* RIGHT: sidebar boxes */}
        <div className="dashboard-side">
          <div className="side-box">
            Date / Calendar
            <div className="side-date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* <button
            className="side-button side-button-active"
            onClick={() => navigate("/students")}
          >
            Students Attendance Info
          </button> */}

          <button
            className="side-button"
            onClick={() => navigate("/summary")}
          >
            Attendance Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;
