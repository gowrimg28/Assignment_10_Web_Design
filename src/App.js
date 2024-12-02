import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import JobListings from './Pages/JobListings/jobListings';
import CompanyShowcase from './Pages/CompanyShowcase/companyShowcase';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Employees from './Pages/Employees/employees';
import AddJob from './Pages/Jobs/add';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser } from './features/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const ProtectedRoute = ({ children, allowedTypes }) => {
    const user = useSelector(selectUser);
    const location = useLocation(); // Get current location to check valid routes
  
    // If the user is not logged in, redirect to login page
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    // If the user's role is not allowed, show "Not authorized" message
    if (!allowedTypes.includes(user.user_type)) {
      return <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>403 - Not Authorized</h1>
        <p>You are not authorized to access this page.</p>
      </div>;
    }
  
    // For invalid URLs, show "Page Not Found" message
    if (!children) {
      return <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for does not exist.</p>
      </div>;
    }
  
    return children;
  };

  const renderRoutes = () => {
    if (user) {
      const type = user.user_type;
      console.log(`User Type: ${type}`);
      return (
        <Routes>
          <Route path="/" element={<Layout user={user} handleLogout={handleLogout} />}>
            {/* Employee-Specific Routes */}
            <Route
              path="home"
              element={
                <ProtectedRoute allowedTypes={['employee']}>
                  <Home user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="job-listings"
              element={
                <ProtectedRoute allowedTypes={['employee']}>
                  <JobListings user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="company-showcase"
              element={
                <ProtectedRoute allowedTypes={['employee']}>
                  <CompanyShowcase user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="contact"
              element={
                <ProtectedRoute allowedTypes={['employee']}>
                  <Contact user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="about"
              element={
                <ProtectedRoute allowedTypes={['employee']}>
                  <About user={user} />
                </ProtectedRoute>
              }
            />
  
            {/* Admin-Specific Routes */}
            <Route
              path="employees"
              element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <Employees user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="addjob"
              element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AddJob user={user} />
                </ProtectedRoute>
              }
            />
  
            {/* Catch-All */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Route>
        </Routes>
      );
    }
  
    // Routes for unauthenticated users
    return (
      <Routes>
        <Route path="/" element={<Layout user={user} handleLogout={handleLogout} />}>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    );
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>{renderRoutes()}</BrowserRouter>
    </>
  );
}

export default App;
