import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PolicyProvider } from './context/PolicyContext';
import { ROLES } from './utils/roles';
import Login from './pages/auth/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import PolicyList from './pages/policies/PolicyList';
import CreatePolicy from './pages/policies/CreatePolicy';
import AdminApprovals from './pages/admin/AdminApprovals';

function App() {
  return (
    <AuthProvider>
      <PolicyProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<DashboardLayout />}>
              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/approvals"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                    <AdminApprovals />
                  </ProtectedRoute>
                }
              />

              {/* Faculty Routes */}
              <Route
                path="/faculty"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
                    <FacultyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faculty/create-policy"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
                    <CreatePolicy />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/faculty/my-policies"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.FACULTY]}>
                    <PolicyList view="my" />
                  </ProtectedRoute>
                }
              />

              {/* Student Routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Shared Routes */}
              <Route
                path="/policies"
                element={
                  <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.FACULTY, ROLES.STUDENT]}>
                    <PolicyList />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </PolicyProvider>
    </AuthProvider>
  );
}

export default App;
