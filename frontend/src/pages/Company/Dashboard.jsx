import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import JobCard from '../Jobs/JobCard';
import JobUpdate from '../Jobs/JobUpdate';
import JobPosting from '../Jobs/JobPosting';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [postAjob, setPostAjob] = useState(false);
  const [jobDetails, setJobDetails] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({ totalApplications: 0 });
  const { userData } = useAuth();
  
  useEffect(() => {
    const Jobs = async (companyId) => {
        try {
            const response = await axios.get(`http://localhost:5000/company/${companyId}/jobs`,
              { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
            );
            setJobs(response.data.jobs);
            const applicationsResponse = await axios.get(`http://localhost:5000/applications/${companyId}/applications`, {
              headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            });
            setApplications({ totalApplications: applicationsResponse.data.applications });
        }
        catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };
    if (userData && userData.role === 'employer') {
        Jobs(userData._id);
    }
  }, []);

  
  const navigate = useNavigate();



  const handleSubmit = async (JobDetails) => {
     await axios.post('http://localhost:5000/company/post-a-job', JobDetails, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => {
      toast.success("Job posted successfully!");
      navigate(0);
    });
    setPostAjob(false);
  };
   

  // Calculate aggregated stats for the header
  const totalResponses = jobs.reduce((sum, job) => sum + job.responses, 0);
  const totalInvitations = applications.totalApplications ? applications.totalApplications.reduce((sum, app) => sum + (app.status === 'invited' ? 1 : 0), 0) : 0;

  return (
    <div className='min-h-screen bg-gray-100 mt-14 p-6 sm:p-10 pt-20'>
      <div className="max-w-7xl mx-auto">
        
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <h1 className='text-4xl font-extrabold text-gray-800' >Employer Dashboard</h1>
            <button
                onClick={() => setPostAjob(!postAjob)} // Assuming you'll add a route for job posting
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
                {postAjob ? "Hide Post Job Form" : "Post New Job"}
            </button>
        </div>

        {postAjob && !jobDetails && <JobPosting handleSubmit={handleSubmit}/>}
        {jobDetails && !postAjob && <JobUpdate handleSubmit={handleSubmit} />}


    { !postAjob && !jobDetails &&
          // View 1: Job Overview
          <>
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-700">
                <p className="text-lg text-gray-500">Total Active Jobs</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">{jobs.filter(j => j.status === 'Active').length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-cyan-500">
                <p className="text-lg text-gray-500">Total Applicants</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">{applications.totalApplications.length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-700">
                <p className="text-lg text-gray-500">Interviews Scheduled</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">{totalInvitations}</p>
              </div>
            </div>
            {/* Job Postings Grid */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Postings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <JobCard 
                  key={job._id} 
                  job={job}
                  totalApplications = {Object.values(applications.totalApplications).filter(app => app.jobId === job._id)}
                  totalInvitations = {Object.values(applications.totalApplications).filter(app => app.jobId === job._id && app.status === 'invited').length}
                />
              ))}
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Dashboard;
