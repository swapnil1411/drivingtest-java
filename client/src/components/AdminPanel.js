import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/available-appointments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      // ✅ Format the date properly before storing
      const formattedAppointments = response.data.map((appt) => ({
        ...appt,
        date: formatDate(appt.date), // Format date
      }));
  
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };
  
  // ✅ Helper function to format date properly
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };
  

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/admin/add-availability",
        { date, timeSlot },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setDate(""); // Clear input
      setTimeSlot(""); // Clear input
      fetchAppointments(); // Refresh list
    } catch (error) {
      console.error("Error adding appointment", error);
      if (error.response && error.response.status === 403) {
        alert("Unauthorized: You do not have admin access.");
      }
    }
  };

  // Generate time slots from 12:00 AM to 11:30 PM in 30-minute intervals
  const generateTimeSlots = () => {
    const times = [];
    const formatTime = (hour, minute) => {
      const ampm = hour < 12 ? "AM" : "PM";
      const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    };

    for (let hour = 0; hour < 24; hour++) {
      times.push(formatTime(hour, 0)); // :00 minutes
      times.push(formatTime(hour, 30)); // :30 minutes
    }

    return times;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Panel - Manage Appointments</h2>
      
      {/* Form to Add Appointments */}
      <form onSubmit={handleAddAppointment} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />

        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        >
          <option value="">Select Time Slot</option>
          {generateTimeSlots().map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add Appointment
        </button>
      </form>

      {/* List of Available Appointments */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Available Appointments</h3>
        <ul>
          {appointments.map((appt, index) => (
            <li key={index} className="p-2 bg-gray-200 dark:bg-gray-700 mb-2 rounded">
              {appt.date} - {appt.timeSlot}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
