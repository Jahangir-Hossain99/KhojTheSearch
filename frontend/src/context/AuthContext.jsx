import React, { createContext, useState,useEffect,useContext, use } from "react";
import { useNavigate } from "react-router-dom";

 const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("userRole")
    if (storedLogin === "true") {
      setIsLoggedIn(true);
       setTimeout(() => {
      setLoading(false); // simulate a small delay
    }, 500);
      if(storedRole) setUserRole(storedRole)
    }
    setLoading(false);
    }, []);
    
    const login = (role) => {
        setIsLoggedIn(true);
        setUserRole(role)
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "true");
    }
    const logout = () => {
        setIsLoggedIn(false);
        setUserRole(null)
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        navigate("/login", { replace: true }); // Redirect to login page
    };  

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading,userRole }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);