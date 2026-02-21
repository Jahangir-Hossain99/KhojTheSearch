import axios from 'axios';
import React, { useEffect,useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ApplicantProfileViewModal = ({ isOpen, onClose, applicant }) => {
   const [loading, setLoading] = useState(false);

  const BACKEND_BASE_URL = 'http://localhost:5000';
  const safeUrl = (url) => {
    if (!url) return null;
    return(`${BACKEND_BASE_URL}${url.URL}`)
  };

  const linkedinHref = safeUrl(applicant.applicantId?.linkedin);
  const resumeHref = safeUrl(applicant.applicantId?.resumeUrl);
  const avatarSrc =  safeUrl(applicant.applicantId?.avatarUrl);

  console.log("Applicant Data in Modal:", applicant); // Debug log to check the applicant data

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleAccept = (status) => {
    setLoading(true);
    try{
      const response = axios.patch(`http://localhost:5000/applications/${applicant._id}/update-status`,
        { status: status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      if (response.success) {
        toast.success(`Applicant ${status === 'invited' ? 'invited' : 'rejected'} successfully!`);
      }
       window.location.reload(); // Refresh the page to reflect status change
    } catch (error) {
      toast.error("Failed to update applicant status. Please try again.");
      console.error("Error updating applicant status:", error);
    } finally {
      setLoading(false);
    }
  };

 

  if (!isOpen || !applicant) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center bg-opacity-50 backdrop-blur-xs p-4" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-8 relative" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Applicant Profile</h2>
            <p className="text-sm text-gray-500">Applied for: {applicant.jobPosition || 'N/A'}</p>
          </div>
          
          {/* Accept/Reject Buttons*/}
          { applicant.status === 'invited' ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-700">
              Already Invited
              </span>
              ) : applicant.status === 'rejected' ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-red-100 text-red-700">
                  Already Rejected
                </span>
                ) :           
          <div className="mt-8 flex items-center justify-end gap-3 pt-6">
            {/* Rejection Button - Secondary Action */}
            <button
              onClick={() => handleAccept("rejected")}
              className="px-6 py-2.5 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 shadow-gray-300 transition-all active:scale-95"
            >
              Reject Applicant
            </button>

            {/* Acceptance Button - Primary Action */}
            <button
              onClick={() => handleAccept("invited")}
              className="px-8 py-2.5 rounded-xl font-bold bg-slate-600 hover:bg-slate-700 text-white shadow-md shadow-slate-200 transition-all active:scale-95"
            >
              Accept & Invite
            </button>

            {/* Close Button - Neutral */}
            <button 
              onClick={onClose}
              className="ml-2 px-4 py-2 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
          </div>
          }
        </div>

        <div className="space-y-6 text-gray-700">
          {/* Profile Basic Info */}
          <div className="flex items-center space-x-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <img 
              src={avatarSrc || 'https://via.placeholder.com/150'} 
              alt="profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" 
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">{applicant.applicantId?.fullName}</h3>
              <p className="text-gray-600">{applicant.applicantId?.email}</p>
              <p className="text-gray-600">{linkedinHref ? <a href={linkedinHref} target="_blank" rel="noreferrer" className="text-slate-600 hover:underline">LinkedIn Profile</a> : 'No LinkedIn Profile'}</p>
              <div className="mt-2">
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                  applicant.status === 'Accepted' ? 'bg-green-100 text-green-700' : 
                  applicant.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  Status: {applicant.status}
                </span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider mb-3">Professional Skills</h4>
            <div className="flex flex-wrap gap-2">
              {applicant.applicantId?.skills?.length > 0 ? (
                applicant.applicantId.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium border border-blue-100">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 italic text-sm">No skills listed</span>
              )}
            </div>
          </div>

          {/* Contact & Date Info */}
          <div className="grid grid-cols-2 gap-4 text-sm border-t pt-6">
            {
                applicant.applicantId?.education.map((edu, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h5 className="font-bold text-gray-800">{edu.degree} in {edu.institution} on {edu.years}</h5>
                    </div>
                ))
            }
            
          </div>
          <div className="text-sm text-gray-500 border-t pt-4">
            {
              applicant.applicantId.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                  <h5 className="font-bold text-gray-800">{exp.title} at {exp.company}</h5>
                  <p className="text-gray-600">{exp.years}</p>
                </div>
              ))
            }
          </div>
          {/* Action Buttons */}
          <div className="mt-8 flex gap-3 pt-6 border-t border-gray-200">
            <a 
              href={resumeHref || '#'} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 text-center"
            >
              Resume / CV
            </a>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfileViewModal;