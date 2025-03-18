import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";
import DriverPanel from "./components/DriverPanel";
import ExaminerPanel from "./components/ExaminerPanel";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css" // Ensure this file exists in `/src/`

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex items-center justify-center`}>
        <button className="absolute top-4 right-4 p-2 bg-gray-300 dark:bg-gray-700 rounded" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/admin" element={<PrivateRoute component={AdminPanel} role="ADMIN" />} />
          <Route path="/driver" element={<PrivateRoute component={DriverPanel} role="DRIVER" />} />
          <Route path="/examiner" element={<PrivateRoute component={ExaminerPanel} role="EXAMINER" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
