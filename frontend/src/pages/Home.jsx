import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [isLoading, setIsLoading] = useState([])

  // 2. Initialize the navigate function
  const navigate = useNavigate();

  // Function to handle the redirect to the job details page
  const handleViewDetails = (jobId) => {
    const selectedJob = jobs.find(job => job._id === jobId)
    // Navigates to the path defined in your main router: /jobs/:id
    navigate(`/jobs/${jobId}`,{state:selectedJob});
  };
  useEffect(()=>{
    const fetchAllJobs =  async ()=>{
      try {
        const response = await axios.get('http://localhost:5000/users/jobs',
          {headers:{Authorization: `Bearer ${localStorage.getItem("authToken")}`}}
        )
        setJobs(response.data.jobs)
      } catch (error) {
       toast.error("Failed to fetch jobs") 
      }
    }
    fetchAllJobs()
  },[])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job._id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800">{job.position}</h3>
            <p className="text-blue-600 font-medium my-2">{job.companyName}</p>
            
            <div className="text-gray-600 space-y-2 mb-4">
              <div className="flex items-center">
                <span className="mr-2">&#x1F4CD;</span>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x1F4B5;</span>
                <span className='font-bold' > BDT {job.salary? `${job.salary}` : "Negotiable"}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x1F5D3;&#xFE0F;</span>
                <span>{job.employmentType}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x1F4CC;</span>
                <span>{job.seniority}</span>
              </div>
            </div>
            
            {/* 3. Modified Button with onClick handler */}
            <button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              // Pass the current job's unique ID to the handler
              onClick={() => handleViewDetails(job._id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
