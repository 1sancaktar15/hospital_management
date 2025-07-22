// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import PatientCreatePage from './pages/PatientCreatePage';
import PatientEditPage from './pages/PatientEditPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/Footer';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <div className="flex flex-1">
            <Sidebar />
            
            <main className="flex-1 p-4 md:p-6 bg-gray-50">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/patients/new" element={<PatientCreatePage />} />
                <Route path="/patients/edit/:id" element={<PatientEditPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
              </Routes>
            </main>
          </div>
          
          <Footer />
          <Notification />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;