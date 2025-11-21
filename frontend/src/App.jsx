import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import LoginPage from "./pages/LoginPage";
import StudentListPage from "./pages/StudentListPage";
import AttendanceSummaryPage from "./pages/AttendanceSummaryPage";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute"; // Use the existing ProtectedRoute
import { useAuth } from "./context/AuthContext";
import "./styles/globalSelections.css";


// Removed the redundant PrivateRoute definition as ProtectedRoute exists and is used.
// const PrivateRoute = ({ children }) => {
//   const { teacher } = useAuth();
//   return teacher ? children : <Navigate to="/login" />;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <StudentListPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/summary"
          element={
            <ProtectedRoute> {/* ✅ Added ProtectedRoute for summary page */}
              <>
                <Navbar />
                <AttendanceSummaryPage />
              </>
            </ProtectedRoute>
          }
        />

        {/* Redirect any unmatched paths to the login page initially */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;