import React, {  useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicantProfileViewModal from './ApplicantProfileViewModal';

const ViewApplicantListModal = ({ isOpen, onClose, applicants }) => {
  
  const navigate = useNavigate();
  const [applicantDetailsModalOpen, setApplicantDetailsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  if (!isOpen) return null;
  
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  return (
    <>
    {applicantDetailsModalOpen && (
      <ApplicantProfileViewModal 
        isOpen={applicantDetailsModalOpen}
        onClose={() => setApplicantDetailsModalOpen(false)}
        applicant={selectedApplicant}
      />
    )}
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-xs px-4"
    onClick={onClose}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">Applicant List</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors text-3xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Body (Table) */}
        <div className="p-6 overflow-y-auto">
          {applicants?.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-500 text-cyan-50 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 font-bold border-b">SL</th>
                  <th className="py-3 px-4 font-bold border-b">Applicant Name</th>
                  <th className="py-3 px-4 font-bold border-b text-center">Status</th>
                  <th className="py-3 px-4 font-bold border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {applicants.map((applicant, index) => (
                  <tr key={applicant._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{applicant.applicantId?.fullName}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        applicant.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                        applicant.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                        'bg-yellow-300 text-yellow-900'
                      }`}>
                        {applicant.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedApplicant(applicant);
                          setApplicantDetailsModalOpen(true);
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg transition-transform transform hover:scale-105 shadow-md"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-10">No applicants found for this job.</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 text-right bg-gray-50">
          <button 
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewApplicantListModal;