import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SessionProvider } from './context/SessionContext';
import { AlertProvider } from './context/AlertContext';
import Home from './components/Home';
import Login from './components/Login';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import CounselorDashboard from './components/counselor/CounselorDashboard';

// A wrapper for routes that require authentication.
// It checks if a user is logged in and renders the correct dashboard based on their role.
const ProtectedRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Determine which dashboard to render based on user role
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'counselor':
      return <CounselorDashboard />;
    default:
      // If role is unknown, redirect to login
      return <Navigate to="/login" replace />;
  }
};

const AppRoutes: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/dashboard"
        element={<ProtectedRoute />} 
      />
      {/* Catch-all route to handle undefined paths gracefully */}
      <Route 
        path="*"
        element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <SessionProvider>
            <AppRoutes />
          </SessionProvider>
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
