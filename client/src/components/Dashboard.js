import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) return <h2 className="text-center mt-10 text-red-500">Please login</h2>;

  const user = jwtDecode(token);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-3xl font-bold mb-4">Welcome, {user.email}</h2>
      <p className="text-lg mb-6">Role: <span className="font-semibold">{user.role}</span></p>
      <div className="flex flex-col space-y-4">
        {user.role === "ADMIN" && <button onClick={() => navigate("/admin")} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Admin Panel</button>}
        {user.role === "DRIVER" && <button onClick={() => navigate("/driver")} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Driver Panel</button>}
        {user.role === "EXAMINER" && <button onClick={() => navigate("/examiner")} className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Examiner Panel</button>}
      </div>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Logout</button>
    </div>
  );
};

export default Dashboard;