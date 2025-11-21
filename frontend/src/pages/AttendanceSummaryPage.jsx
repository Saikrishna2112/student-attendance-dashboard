import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import "../styles/summaryPage.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AttendanceSummaryPage = () => {
  const { teacher } = useAuth();
  const [summary, setSummary] = useState([]);
  const navigate = useNavigate();

  const loadSummary = async () => {
    const res = await axiosClient.get(
      `/api/attendance/summary?className=${teacher.className}`
    );
    setSummary(res.data);
  };

  useEffect(() => {
    loadSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        {/* LEFT: Chart */}
        <div className="dashboard-main-card">
          <Card>
            <h1 className="table-title">
              Attendance Summary - Class {teacher.className}
            </h1>

            <BarChart width={700} height={350} data={summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="attendancePercentage" fill="#007bff" />
            </BarChart>

            <div className="submit-row">
              <Button onClick={() => navigate("/students")}>
                Student Attendance Info
              </Button>
            </div>
          </Card>
        </div>

        {/* RIGHT: sidebar */}
        {/* <div className="dashboard-side">
          <div className="side-box">Date / Calendar</div>

          <button
            className="side-button"
            onClick={() => navigate("/students")}
          >
            Students Attendance Info
          </button>

          <button className="side-button side-button-active">
            Attendance Summary
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AttendanceSummaryPage;
