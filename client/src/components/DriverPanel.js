import React, { useState, useEffect } from "react";
import axios from "axios";

const DriverPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [carModel, setCarModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [carAdded, setCarAdded] = useState(false);
  const [hasAppointment, setHasAppointment] = useState(false);
  const token = localStorage.getItem("token"); // ✅ Get token from localStorage

  useEffect(() => {
    checkDriverStatus();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", { 
      month: "long", day: "numeric", year: "numeric"
    }).format(date);
  };
  

  const checkDriverStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/driver/status", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCarAdded(response.data.carAdded);
      setHasAppointment(response.data.hasAppointment);

      if (response.data.hasAppointment) {
        fetchBookedAppointment(); // ✅ Fetch booked appointment if exists
      } else {
        fetchAppointments(); // ✅ Otherwise, fetch available appointments
      }
    } catch (error) {
      console.error("Error checking driver status", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/appointments/available", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const formattedAppointments = response.data.map(appt => ({
        ...appt,
        date: formatDate(appt.date) // ✅ Format each appointment date
      }));
  
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };
  

  const fetchBookedAppointment = async () => {
    try {
      const response = await axios.get("http://localhost:8080/driver/booked-appointment", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Response Data:", response.data);
  
      if (response.data && response.data.date) {
        const formattedDate = formatDate(response.data.date);
        let statusMessage = "Pending Result - Please give exam"; // Default message
  
        if (response.data.examResult !== null) {
          statusMessage = response.data.examResult ? "✅ Passed" : "❌ Failed";
        }
  
        setBookedAppointment({ ...response.data, date: formattedDate, statusMessage });
      } else {
        setHasAppointment(false);
      }
    } catch (error) {
      console.error("Error fetching booked appointment", error);
    }
  };
  
  

  const handleAddCarDetails = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/driver/add-car-details",
        { carModel, licensePlate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
      setCarAdded(true);
    } catch (error) {
      console.error("Error adding car details", error);
    }
  };

  const handleBookAppointment = async (appointmentId) => {
    try {
      await axios.post(
        `http://localhost:8080/driver/book-appointment/${appointmentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setHasAppointment(true);
      fetchBookedAppointment(); // ✅ Update UI with booked appointment
    } catch (error) {
      console.error("Error booking appointment", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h2 className="text-3xl font-bold mb-6">Driver Panel</h2>
      
      {hasAppointment && bookedAppointment ? (
        <div className="bg-green-200 dark:bg-green-700 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-semibold">Your Booked Appointment</h3>
          <p className="text-lg">{bookedAppointment.date} - {bookedAppointment.timeSlot}</p>
          <p className="text-lg font-bold">{bookedAppointment.statusMessage}</p>
        </div>
      ) : hasAppointment ? (
        <p className="text-lg">You have already booked an appointment.</p>
      ) : ( 
      
        <>
          {/* ✅ Show car details form only if car is not added */}
          {!carAdded && (
            <form onSubmit={handleAddCarDetails} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
              <input
                type="text"
                placeholder="Car Model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
              <input
                type="text"
                placeholder="License Plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Add Car Details
              </button>
            </form>
          )}

          {/* ✅ Show available appointments only if no appointment is booked */}
          <h3 className="text-xl font-semibold mb-2">Available Appointments</h3>
          <ul>
            {appointments.map((appt) => (
              <li key={appt.id} className="p-2 bg-gray-200 dark:bg-gray-700 mb-2 rounded flex justify-between">
                {appt.date} - {appt.timeSlot}
                <button
                  onClick={() => handleBookAppointment(appt.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Book
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DriverPanel;
