import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainNavbar from "./components/Navbar/MainNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
      <BrowserRouter>
      <MainNavbar />
      <Toaster position="center-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;