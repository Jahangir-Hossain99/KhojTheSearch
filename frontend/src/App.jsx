import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
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
import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";
import Loader from "./components/Loader"


function App() {

  const {loading} = useAuth();

  if(loading){
    return <Loader />
  }

  return (
    <>
      <MainNavbar />
      <Toaster position="center-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={
          <PrivateRoute allowedRoles={['user','admin']}>
            <JobDetails />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute allowedRoles={['user','admin']} >
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute allowedRoles={['user','admin']} >
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute allowedRoles={['admin']} >
            <AdminPanel />
          </PrivateRoute>
        } />
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      
    </>
  );
}

export default App;