import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, unallowedRoles, allowguest = false }) => {
  const { isLoggedIn, loading,userData } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // ⏳ Show loading
  }

  if(allowguest && !isLoggedIn){
    return children
  }

  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
    // Logged in but role doesn't match → redirect to not authorized
  if (unallowedRoles && unallowedRoles.includes(userData?.role)) {
    return <Navigate to="/unauthorized"  replace />;
  }

  

    return children;
};

export default PrivateRoute;