import React, { createContext, useState,useEffect,useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getUserData } from '../utils/UserData';
import axios from "axios";

const User = await getUserData();

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location =  useLocation();

  const login = useCallback((user, token) => {
        setUserData(user);
        setIsLoggingIn(true);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user));

        if(user.role === 'jobseeker'){
         navigate('/profile',{replace:true})
        }else if(user.role=== 'employer'){
          console.log(user.role)
         navigate('/dashboard')
        } else {
            navigate('/', { replace: true });
        }
        setTimeout(() => setIsLoggingIn(false), 50); 
    },[])// Login function

  const logout = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("authToken");
        localStorage.clear();
        navigate("/login", { replace: true }); // Redirect to login page
    },[navigate])// Logout function

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedData = localStorage.getItem("userData");
    const token = localStorage.getItem("authToken");

    if(token && storedData){
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    if (storedLogin === "true") {
      setIsLoggedIn(true);
       setTimeout(() => {
      setLoading(false); // simulate a small delay
    }, 500);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
    }, []);// Initial load effect

    useEffect(()=>{
      if(isLoggingIn){
        return; 
      }
      if(isLoggedIn && location.pathname === '/login'){
        console.log("Browser's backward button was hit and it had automatically logout.")
        logout()
      }
    },[isLoggedIn,location.pathname,logout])// Handle browser back button logout

  const updatedUserData = useCallback((newUserData) => {
        setUserData(newUserData);
        localStorage.setItem("userData", JSON.stringify(newUserData));
    }, []); // Update user data function
  

    return (
        <AuthContext.Provider value={{ userData, isLoggedIn, login, logout, loading,updatedUserData,  }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);