import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(
    JSON.parse(localStorage.getItem("teacher")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (teacherData, authToken) => { // Renamed params for clarity
    localStorage.setItem("token", authToken);
    localStorage.setItem("teacher", JSON.stringify(teacherData));
    setTeacher(teacherData); // Store the full teacher object including className
    setToken(authToken); // Also update token state
  };


  const logout = () => {
    setTeacher(null);
    setToken(null);
    localStorage.removeItem("teacher");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ teacher, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);