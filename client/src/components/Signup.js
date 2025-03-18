import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("DRIVER");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", { email, password, userType });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
        console.log(error); 
      alert("Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white" required />
        <select value={userType} onChange={(e) => setUserType(e.target.value)} className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white">
          <option value="DRIVER">Driver</option>
          <option value="EXAMINER">Examiner</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
