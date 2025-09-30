import { Routes, Route,useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainNavbar from "./components/Navbar/MainNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import Loader from "./components/Loader"
import Searchbar from "./components/Searchbar/Searchbar";
import JobPosting from "./pages/JobPosting";


function App() {

  const {loading,userRole} = useAuth();
  const location = useLocation();

  if(loading){
    return <Loader />
  }

  const showSearchBar = location.pathname === '/' || location.pathname ==='/jobs';

  return (
    <>
      <MainNavbar />
      {showSearchBar && <Searchbar />}
      <Toaster position="center-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/profile" element={
          <PrivateRoute allowedRoles={['user','admin']} >
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute allowedRoles={['admin','employee']} >
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/admin-panel" element={
          <PrivateRoute allowedRoles={['admin']} >
            <AdminPanel />
          </PrivateRoute>
        } />
        <Route path="/post_a_job" element={
          <PrivateRoute allowedRoles={['admin','employee']} >
            <JobPosting />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      
    </>
  );
}

export default App;