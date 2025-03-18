import React, { useState, useEffect } from "react";
import axios from "axios";

const ExaminerPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem("token"); // ✅ Get token

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/examiner/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const filteredAppointments = response.data.filter(appt => !appt.examResult || !appt.examResult.passed);
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };
  

  const handleUpdateResult = async (appointmentId, result) => {
    try {
     const response= await axios.post(
        `http://localhost:8080/examiner/update-result/${appointmentId}/${result}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("result",response);
      fetchAppointments(); // ✅ Refresh after update
    } catch (error) {
      console.error("Error updating exam result", error);
    }
  };

  // ✅ Helper function to format date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", {
      month: "long", day: "numeric", year: "numeric"
    }).format(date);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h2 className="text-3xl font-bold mb-6">Examiner Panel - Manage Exam Results</h2>
      <h3 className="text-xl font-semibold mb-2">Appointments</h3>
      <ul>
        {appointments.map((appt) => (
          <li key={appt.id} className="p-2 bg-gray-200 dark:bg-gray-700 mb-2 rounded flex justify-between">
            {appt.date} - {appt.timeSlot} - {appt.driver.email}
            <div>
              <button 
                onClick={() => handleUpdateResult(appt.id, true)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
              >
                Pass
              </button>
              <button 
                onClick={() => handleUpdateResult(appt.id, false)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Fail
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExaminerPanel;
