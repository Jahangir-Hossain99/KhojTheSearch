import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import JobCard from '../Jobs/JobCard';
import JobUpdate from '../Jobs/JobUpdate';
import JobPosting from '../Jobs/JobPosting';
import toast from 'react-hot-toast';


// --- Sub Components ---

// Applicant Row Component
// const ApplicantRow = ({ applicant, onInvite, onReject }) => {
//   const statusClasses = {
//     New: 'bg-blue-100 text-blue-800',
//     Invited: 'bg-green-100 text-green-800',
//     Rejected: 'bg-red-100 text-red-800',
//   };

//   return (
//     <tr className="border-b hover:bg-gray-50 transition-colors">
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{applicant.name}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.applied}</td>
//       <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">{applicant.score}%</td>
//       <td className="px-6 py-4 whitespace-nowrap">
//         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[applicant.status]}`}>
//           {applicant.status}
//         </span>
//       </td>
//       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
//         {applicant.status !== 'Invited' && (
//           <button
//             onClick={() => onInvite(applicant.id)}
//             className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-200 rounded-md transition-colors"
//             disabled={applicant.status === 'Rejected'}
//           >
//             Invite
//           </button>
//         )}
//         {applicant.status !== 'Rejected' && (
//           <button
//             onClick={() => onReject(applicant.id)}
//             className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded-md transition-colors"
//             disabled={applicant.status === 'Invited'}
//           >
//             Reject
//           </button>
//         )}
//       </td>
//     </tr>
//   );
// };


// --- Main Dashboard Component ---

const Dashboard = () => {
  const [postAjob, setPostAjob] = useState(false);
  const [jobDetails, setJobDetails] = useState(false);
  const { userData,jobs } = useAuth();
  
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
  const totalInvited = jobs.reduce((sum, job) => sum + job.invited, 0);

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
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                <p className="text-lg text-gray-500">Total Active Jobs</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">{jobs.filter(j => j.status === 'Active').length}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-cyan-500">
                <p className="text-lg text-gray-500">Total Applicants</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">{totalResponses}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
                <p className="text-lg text-gray-500">Interviews Scheduled</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">{totalInvited}</p>
              </div>
            </div>
            {/* Job Postings Grid */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Postings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map(job => (
                <JobCard 
                  key={job._id} 
                  job={job}
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
