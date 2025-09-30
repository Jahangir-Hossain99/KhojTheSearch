import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- MOCK DATA ---
const mockJobs = [
  { id: 1, title: 'Senior Software Engineer', responses: 32, invited: 5, status: 'Active' },
  { id: 2, title: 'Product Manager (Remote)', responses: 58, invited: 8, status: 'Active' },
  { id: 3, title: 'Junior Data Analyst', responses: 110, invited: 12, status: 'Closed' },
  { id: 4, title: 'UX/UI Designer', responses: 15, invited: 3, status: 'Active' },
];

const mockApplicants = {
  1: [
    { id: 'app101', name: 'Alice Johnson', score: 92, status: 'New', applied: '2 days ago' },
    { id: 'app102', name: 'Bob Smith', score: 88, status: 'Invited', applied: '3 days ago' },
    { id: 'app103', name: 'Charlie Brown', score: 75, status: 'New', applied: '5 days ago' },
    { id: 'app104', name: 'Diana Prince', score: 95, status: 'New', applied: '1 week ago' },
  ],
  2: [
    { id: 'app201', name: 'Eve Adams', score: 85, status: 'New', applied: '1 day ago' },
    { id: 'app202', name: 'Frank Miller', score: 79, status: 'Rejected', applied: '4 days ago' },
  ],
  // ... more applicants for other jobs
};

// --- Sub Components ---

// Applicant Row Component
const ApplicantRow = ({ applicant, onInvite, onReject }) => {
  const statusClasses = {
    New: 'bg-blue-100 text-blue-800',
    Invited: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{applicant.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.applied}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">{applicant.score}%</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[applicant.status]}`}>
          {applicant.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
        {applicant.status !== 'Invited' && (
          <button
            onClick={() => onInvite(applicant.id)}
            className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-200 rounded-md transition-colors"
            disabled={applicant.status === 'Rejected'}
          >
            Invite
          </button>
        )}
        {applicant.status !== 'Rejected' && (
          <button
            onClick={() => onReject(applicant.id)}
            className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-200 rounded-md transition-colors"
            disabled={applicant.status === 'Invited'}
          >
            Reject
          </button>
        )}
      </td>
    </tr>
  );
};


// Applicant List View Component
const ApplicantsList = ({ job, applicants, onBack, onUpdateApplicantStatus }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">Applicants for: {job.title}</h2>
        <button
          onClick={onBack}
          className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Job Overview
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Screening Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants.length > 0 ? (
              applicants.map(applicant => (
                <ApplicantRow 
                  key={applicant.id} 
                  applicant={applicant} 
                  onInvite={onUpdateApplicantStatus}
                  onReject={onUpdateApplicantStatus}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No applicants for this job yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// Job Overview Card Component
const JobCard = ({ job, onSelectJob }) => {
  const statusColor = job.status === 'Active' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
        <span className={`text-xs font-medium px-3 py-1 rounded-full text-white ${statusColor}`}>
          {job.status}
        </span>
      </div>
      
      <div className="mt-4 space-y-2 text-gray-600">
        <p className="flex justify-between items-center text-lg font-medium">
          Total Responses: <span className="text-purple-600 font-semibold text-2xl">{job.responses}</span>
        </p>
        <p className="flex justify-between items-center text-lg font-medium">
          Invited for Interview: <span className="text-cyan-600 font-semibold text-2xl">{job.invited}</span>
        </p>
      </div>
      
      <button
        onClick={() => onSelectJob(job.id)}
        className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
      >
        View Applicants
      </button>
    </div>
  );
};

// --- Main Dashboard Component ---

const Dashboard = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applicantData, setApplicantData] = useState(mockApplicants);

  const navigate = useNavigate();

  const handleUpdateApplicantStatus = (applicantId, action) => {
    setApplicantData(prevData => {
      const jobId = selectedJobId;
      const jobApplicants = prevData[jobId] || [];
      
      const newApplicants = jobApplicants.map(applicant => {
        if (applicant.id === applicantId) {
          return {
            ...applicant,
            status: action === 'Invite' ? 'Invited' : 'Rejected',
          };
        }
        return applicant;
      });

      return {
        ...prevData,
        [jobId]: newApplicants,
      };
    });
  };

  const selectedJob = mockJobs.find(job => job.id === selectedJobId);
  const currentApplicants = selectedJobId ? applicantData[selectedJobId] || [] : [];
  
  // Calculate aggregated stats for the header
  const totalResponses = mockJobs.reduce((sum, job) => sum + job.responses, 0);
  const totalInvited = mockJobs.reduce((sum, job) => sum + job.invited, 0);

  return (
    <div className='min-h-screen bg-gray-100 mt-14 p-6 sm:p-10 pt-20'>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <h1 className='text-4xl font-extrabold text-gray-800' >Employer Dashboard</h1>
            <button
                onClick={() => navigate('/post_a_job')} // Assuming you'll add a route for job posting
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
            >
                + Post New Job
            </button>
        </div>

        {/* --- Main Content Area --- */}
        {selectedJobId && selectedJob ? (
          // View 2: Detailed Applicant List
          <ApplicantsList
            job={selectedJob}
            applicants={currentApplicants}
            onBack={() => setSelectedJobId(null)}
            onUpdateApplicantStatus={handleUpdateApplicantStatus}
          />
        ) : (
          // View 1: Job Overview
          <>
            {/* Summary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                <p className="text-lg text-gray-500">Total Active Jobs</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">{mockJobs.filter(j => j.status === 'Active').length}</p>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Live Postings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onSelectJob={setSelectedJobId}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
