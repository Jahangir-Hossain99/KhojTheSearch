import { Routes, Route } from "react-router-dom";
import MainNavbar from "./components/Navbar/MainNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <MainNavbar />
      <Toaster position="center-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;