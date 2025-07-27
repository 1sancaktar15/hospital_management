// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import PatientCreatePage from "./pages/PatientCreatePage";
import PatientEditPage from "./pages/PatientEditPage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import SettingsPage from "./pages/SettingsPage"; // Yeni eklendi

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/Footer";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";

import Notification from "./components/Notification";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/Login";

// Kullanıcının giriş yapıp yapmadığını kontrol eden basit PrivateRoute componenti
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
  <ThemeProvider>
    <NotificationProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#f3f6fd]">
          <Navbar />

          <div className="flex flex-1">
            <Sidebar />

            <main className="flex-1 p-4 md:p-6">
              <Routes>
                {/* Açık rotalar */}
                <Route path="/login" element={<Login />} />

                {/* Giriş gerektiren özel rotalar */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/patients"
                  element={
                    <PrivateRoute>
                      <PatientsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/patients/new"
                  element={
                    <PrivateRoute>
                      <PatientCreatePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/patients/edit/:id"
                  element={
                    <PrivateRoute>
                      <PatientEditPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/doctors"
                  element={
                    <PrivateRoute>
                      <DoctorsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/appointments"
                  element={
                    <PrivateRoute>
                      <AppointmentsPage />
                    </PrivateRoute>
                  }
                />
                {/* Yeni Ayarlar Route */}
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <SettingsPage />
                    </PrivateRoute>
                  }
                />

                {/* Diğer bilinmeyen rotalar /login'e yönlendir */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </main>
          </div>

          <Footer />
          <Notification />
        </div>
      </Router>
    </NotificationProvider>
  </ThemeProvider>

  );
}

export default App;
