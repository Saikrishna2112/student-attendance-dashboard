import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css";
import "../../styles/navbar.css";



const Navbar = () => {
  const { teacher, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-title-box">
        <span className="nav-title">Attendance Dashboard</span>
      </div>

      <div className="nav-user-box">
        <span>User: {teacher?.name}</span>
      </div>

      <button className="nav-logout-box" onClick={logout}>
        LogOut
      </button>
    </nav>
  );
};

export default Navbar;
