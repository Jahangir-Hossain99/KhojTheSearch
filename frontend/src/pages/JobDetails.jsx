import React, { useEffect, useState } from 'react';
import {useAuth} from '../context/AuthContext';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

const JobDetails = () => {

  const [companyDetails, setCompanyDetails] = useState()

  const location = useLocation();
  const jobData = location.state;
  
  useEffect(()=>{
    const fetchCompanyDetails =  async ()=>{
      if(!jobData?.companyId)return;
      try {
        const response = await axios.get(`http://localhost:5000/users/companyDetails/${jobData.companyId}`,
          {headers:{Authorization: `Bearer ${localStorage.getItem("authToken")}`}}
        )
        setCompanyDetails(response.data.companyDetails)
      } catch (error) {
       toast.error("Failed to fetch jobs") 
      }
    }
    fetchCompanyDetails()
  },[jobData?.companyId])
  
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    // In a real application, this would navigate to an application form
    if(userRole === 'user'){
    alert(`Applying for: ${title} at ${company}!`);
    } else {
      alert('Please login as a user to apply for jobs.');
      navigate("/login", { replace: true });
    }
  }

  // Helper component for section titles
  const SectionTitle = ({ children }) => (
    <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-purple-300">
      {children}
    </h3>
  );

  if (!companyDetails) return <div className="pt-20 text-center">Loading Company Info...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* --- Job Header and Quick Info --- */}
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 mb-8">
          <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-1">{jobData.position}</h1>
              <p className="text-xl text-cyan-700 font-semibold mb-3">{jobData.companyName}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm md:text-base">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  {jobData.location}
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.417c1.192-.74 2.408-.74 3.6 0l1.733 1.083c1.242.775 2.167 2.2 2.167 3.65v.983c0 1.45-.925 2.875-2.167 3.65l-1.733 1.083c-1.192.74-2.408.74-3.6 0l-1.733-1.083C4.925 15.917 4 14.492 4 13.042v-.983c0-1.45.925-2.875 2.167-3.65L8.433 7.417zM10 14a4 4 0 100-8 4 4 0 000 8z" /></svg>
                  {jobData.salary}
                </span>
                <span className="text-sm text-gray-400 self-center">
                  Posted: {new Date(jobData.updatedAt).toLocaleDateString('en-US',{day: '2-digit', month: 'short', year: 'numeric'}) }
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="mt-4 md:mt-0 px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* --- Main Content Layout (Two Columns) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Job Details) - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Job Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <SectionTitle>Job Description</SectionTitle>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {jobData.description}
                </p>
              
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <SectionTitle>Key Requirements</SectionTitle>
              <ul className="list-disc list-inside text-gray-700 text-base space-y-2 ml-4">
                { jobData.requirements}
              </ul>
            </div>

          </div>

          {/* Right Column (Company & Benefits) - Takes 1/3 width on large screens */}
          <div className="lg:col-span-1 space-y-8">

            {/* Company Overview (Similar to your About/Contact section) */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <SectionTitle>About {companyDetails.name}</SectionTitle>
              <p className="text-gray-700 mb-4">
                {companyDetails.about}
              </p>
              <div className="text-base text-gray-700 space-y-2">
                <p className="flex items-center"><span className="font-semibold w-20">Website:</span> <a href="#" className="text-blue-600 hover:underline">{companyDetails.website}</a></p>
                <p className="flex items-center"><span className="font-semibold w-20">Address:</span> {companyDetails.address}</p>
                
              </div>
            </div>

            {/* Benefits Section (Similar to your Skills section) */}
            {/* <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <SectionTitle>Perks & Benefits</SectionTitle>
              <div className="flex flex-wrap gap-3">
                {benefits.map((benefit, index) => (
                  <span 
                    key={index} 
                    className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div> */}
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;
