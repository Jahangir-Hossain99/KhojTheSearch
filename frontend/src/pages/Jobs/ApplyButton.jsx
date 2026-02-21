import axios from "axios"
import { useState } from "react";

export default function ApplyButton({applicationDetails, isApplied, setIsApplied}) {
    const [loading, setLoading] = useState(false);

    const handleApply = async ()=> {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:5000/users/apply/${applicationDetails.jobId}`, applicationDetails, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            });
            alert("Application Submitted Successfully!");
            setIsApplied(true);
        } catch (error) {
            // console.error("Error submitting application:", error);
            alert(error?.response?.data?.message || "Failed to submit application. Please try again.");
        }finally {
            setLoading(false);
        }
    }

    const handleWithdraw = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:5000/jobs/withdraw/${applicationDetails.jobId}/${applicationDetails.applicantId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
            });
            alert("Application Withdrawn Successfully!");
            setIsApplied(false);
        } catch (error) {
            // console.error("Error withdrawing application:", error);
            alert(error?.response?.data?.message || "Failed to withdraw application. Please try again.");
        }finally {
            setLoading(false);
        }
    }

   return <>
        { isApplied ? (
            <button 
                onClick={handleWithdraw}
                disabled={loading}
                className="px-6 py-3 bg-red-800 text-white rounded-md hover:bg-red-900 transition disabled:opacity-50"
            >
                {loading ? "Withdrawing..." : "Withdraw Application"}
            </button>
        ) : (
            <button
                onClick={handleApply}
                disabled={loading}
                className="px-6 py-3 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition disabled:opacity-50"
            >
                {loading ? "Applying..." : "Apply Now"}
            </button>
        )
        }
    </>
};
