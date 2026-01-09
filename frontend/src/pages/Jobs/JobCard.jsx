import React, { useState } from 'react';
import JobViewModal from './JobViewModal';
import JobUpdateModal from './JobUpdateModal';
import ConfirmationModal from '../../components/UI/ConfirmationModal'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const JobCard = ({ job }) => {

  const navigate = useNavigate();
  
  const statusColor = job.status === 'Active' ? 'bg-green-500' : 'bg-red-500';
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showUpdateJobModal, setShowUpdateJobModal] = useState(false);
  const [editData, setEditData] = useState({...job});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleJobDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmJobDelete = () => {
    setShowDeleteConfirm(false);
    axios.delete(`http://localhost:5000/company/jobs/${job._id}`,{
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    })
      .then(() => {
        setShowJobDetails(false);
        toast.success("Job deleted successfully!");
        navigate(0);
      }
      )
      .catch(() => {
        toast.error("Failed to delete job");
      });
  };
  
  return (
    <>
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{job.position}</h3>
        <span className={`text-xs font-medium px-3 py-1 rounded-full text-white ${statusColor}`}>
          {job.status}
        </span>
      </div>
      
      <div className="mt-4 space-y-2 text-gray-600">
        <p className="flex justify-between items-center text-lg font-medium">
          Total Responses: <span className="text-purple-600 font-semibold text-2xl">{job.responses || 0}</span>
        </p>
        <p className="flex justify-between items-center text-lg font-medium">
          Invited for Interview: <span className="text-cyan-600 font-semibold text-2xl">{job.invited || 0}</span>
        </p>
      </div>
      
      <button
        onClick={""}
        className="mt-6 w-full bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
      >
        View Applicants
      </button>
      <button
        onClick={() => setShowJobDetails(true)}
        className="mt-6 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 shadow-md"
      >
        View Job Details
      </button>
    </div>
    {showJobDetails && <JobViewModal handleJobDelete={handleJobDelete} handleJobUpdate={() => setShowUpdateJobModal(true)}  onClose={() => setShowJobDetails(false)} job={job} />}
    {showUpdateJobModal && (<JobUpdateModal job={job} editData={editData} setEditData={setEditData} onClose={() => setShowUpdateJobModal(false)} />)}
    {showDeleteConfirm && (<ConfirmationModal
      isOpen={showDeleteConfirm}
      message="delete this job posting? This action cannot be undone."
      confirm={confirmJobDelete}
      cancel={() => setShowDeleteConfirm(false)}
    />)}
    </>
  );
};

export default JobCard;