import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// 🧠 Smart component to check authentication at the Root URL (/)
const RootRedirect = () => {
  const token = localStorage.getItem('token');
  
  // If token exists, auto-jump to dashboard. Otherwise, go to login.
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* Temporary Navigation Header */}
        <nav style={{ marginBottom: '30px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          {/* 🔄 Updated to use our smart checker */}
          <Route path="/" element={<RootRedirect />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="*" element={<div style={{ padding: '20px' }}><h3>404 - Page Not Found</h3><Link to="/login">Go to Login</Link></div>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;