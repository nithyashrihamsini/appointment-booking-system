import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      // 1. Grab the token from localStorage
      const token = localStorage.getItem('token');

      // 🛡️ If no token exists, boot them back to login immediately
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // 🚀 Fetch appointments with the secure Authorization Header
        const response = await axios.get('http://localhost:5000/api/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("This is what the backend sent us:", response.data);
        setAppointments(response.data.appointments);
      } catch (err) {
        setError('Failed to load appointments. Please log in again.');
        // If token is expired or invalid, clear it and redirect
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  // 🚪 Log out function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Destroy the token
    navigate('/login'); // Send back to login
  };

  if (loading) return <div style={{ padding: '20px' }}>🔄 Loading your dashboard...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>💈 Your Appointment Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '8px 12px', background: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Log Out
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      ### Your Scheduled Bookings
      <hr />

      {appointments.length === 0 ? (
        <div style={{ padding: '20px', background: '#f9f9f9', border: '1px dashed #ccc', textAlign: 'center' }}>
          <p>You don't have any appointments scheduled yet.</p>
          <button style={{ padding: '10px 15px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Book Your First Appointment
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {appointments.map((apt) => (
            <div key={apt._id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '6px', background: '#fff' }}>
              <h4>✨ {apt.service || 'Haircut & Styling'}</h4>
              <p>📅 **Date:** {new Date(apt.date).toLocaleDateString()}</p>
              <p>⏰ **Time:** {apt.time || 'N/A'}</p>
              <p>👤 **Barber/Stylist:** {apt.barber || 'Any Available'}</p>
              <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', background: apt.status === 'confirmed' ? '#D4EDDA' : '#FFF3CD', color: apt.status === 'confirmed' ? '#155724' : '#856404' }}>
                {apt.status || 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;