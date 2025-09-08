import React, { createContext, useState,useEffect,useContext, use } from "react";
import { useNavigate } from "react-router-dom";

 const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
    setLoading(false);
    }, []);
    
    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    }
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        navigate("/login", { replace: true }); // Redirect to login page
    };  

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);