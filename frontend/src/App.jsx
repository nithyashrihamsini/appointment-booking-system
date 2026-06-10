import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        
        {/* Temporary Navigation Header so we can test clicking around */}
        <nav style={{ marginBottom: '30px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
          <Link to="/register" style={{ marginRight: '15px' }}>Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        {/* This component decides which page component to render based on the current browser URL */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Default fallback route if the path doesn't match anything else */}
          <Route path="*" element={<div style={{ padding: '20px' }}><h3>404 - Page Not Found</h3><Link to="/login">Go to Login</Link></div>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;