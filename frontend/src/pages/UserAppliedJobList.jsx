import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import ApplyButton from './Jobs/ApplyButton';

const UserAppliedJobList = () => {
    const { userData } = useAuth();
    const [userAppliedJobs, setUserAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      if (!userData?._id) return;
        const fetchAppliedJobs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/jobs/${userData._id}/applied-jobs`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                });
                setUserAppliedJobs(response.data.userAppliedJobsWithStatus||[]);
            } catch (error) {
                console.error("Failed to fetch applied jobs", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAppliedJobs();
    }, []);

    // Function to handle the redirect to the job details page
  const handleViewDetails = (jobId) => {
    const selectedJob = userAppliedJobs.find(job => job.job._id === jobId)
    // Navigates to the path defined in your main router: /jobs/:id
    navigate(`/jobs/${jobId}`,{state:selectedJob.job});
  };

    if (loading) {
        return <div className="pt-20 text-center">Loading your applied jobs...</div>;
    }
    if (error) {
        return <div className="pt-20 text-center text-red-500">Error: {error}</div>;
    }

  return (
    <div className="pt-20 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 mt-4 text-center text-gray-800">
        Jobs Applied by {userData?.fullName || "You"}
      </h1>

      {userAppliedJobs.length === 0 ? (
        <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {userAppliedJobs.map((job) => (
            <li
              key={job.job._id}
              className="flex flex-col bg-white border rounded-xl p-5 shadow-sm hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-gray-900">
                {job.job.position}
              </h2>
              <span className='text-sm text-gray-500' >
                {job.job.salary ? `BDT: ${job.job.salary.toLocaleString()}` : "Not specified"}
              </span>
              </div>

              <p className="text-sm text-cyan-700 font-bold">
                {job.job.companyName}
              </p>

              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {job.job.description}
              </p>
              <p>
                <span className={`px-2 py-1 mt-3 inline-block text-xs uppercase font-semibold rounded-full ${
                  job.applicationStatus === 'invited' ? 'bg-green-100 text-green-700' :
                  job.applicationStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  Application Status: {job.applicationStatus || 'Pending'}
                </span>
              </p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t ">
                <span className="text-xs text-gray-400">
                Applied on{" "}
                {new Date(job.job.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                </span>
                <button 
                  onClick={() => handleViewDetails(job.job._id)}
                  className="px-4 py-1.5 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-600"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

      


export default UserAppliedJobList