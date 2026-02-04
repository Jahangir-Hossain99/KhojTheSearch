/* eslint-disable no-unused-vars */
import { Routes, Route,useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainNavbar from "./components/Navbar/MainNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Company/Dashboard";
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import Loader from "./components/Loader"
import Searchbar from "./components/Searchbar/Searchbar";
import CompanyRegister from "./pages/Company/CompanyRegister";
import CompanyLogin from "./pages/Company/CompanyLogin";
import CompanyProfile from "./pages/Company/CompnayProfile";
import UserAppliedJobs from "./pages/UserAppliedJobList";



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
      <Routes>
        <Route path="/" element={
          <PrivateRoute unallowedRoles={['employer']} allowguest={true} >
            <Home />
          </PrivateRoute>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/profile" element={
          <PrivateRoute unallowedRoles={['employer']} >
            <Profile />
          </PrivateRoute>
        } />
        <Route path="/appliedJobs" element={
          <PrivateRoute unallowedRoles={['employer']} >
            <UserAppliedJobs />
          </PrivateRoute>
        } />
        <Route path="/company-profile" element={
          <PrivateRoute unallowedRoles={['jobseeker']} >
            <CompanyProfile />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-register" element={<CompanyRegister />} />
        <Route path="/dashboard" element={
          <PrivateRoute unallowedRoles={['jobseeker']} >
            <Dashboard />
          </PrivateRoute>
        } />
        
       

        <Route path="/admin-panel" element={
          <PrivateRoute unallowedRoles={['employer','jobseeker']} >
            <AdminPanel />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound/>} />
      </Routes>      
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;