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
                setUserAppliedJobs(response.data.userAppliedJobs||[]);
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
    const selectedJob = userAppliedJobs.find(job => job._id === jobId)
    // Navigates to the path defined in your main router: /jobs/:id
    navigate(`/jobs/${jobId}`,{state:selectedJob});
  };

    if (loading) {
        return <div className="pt-20 text-center">Loading your applied jobs...</div>;
    }
    if (error) {
        return <div className="pt-20 text-center text-red-500">Error: {error}</div>;
    }

  return (
    <div className="pt-20 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Applied Jobs
      </h1>

      {userAppliedJobs.length === 0 ? (
        <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {userAppliedJobs.map((job) => (
            <li
              key={job._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {job.position}
              </h2>
              <p className="text-sm text-cyan-700 font-medium">
                {job.companyName}
              </p>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {job.description}
              </p>

              <div className="mt-4 text-xs text-gray-400">
                Applied on{" "}
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                <button
                  onClick={() => handleViewDetails(job._id)}
                  className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
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