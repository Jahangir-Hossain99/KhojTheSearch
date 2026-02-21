const JobViewModal = ({ job, onClose, handleJobDelete, handleJobUpdate, totalApplications, totalInvitations }) => (
        
        <div className="fixed inset-0 z-51 flex items-center justify-center bg-opacity-50 backdrop-blur-sm p-4" onClick={onClose}>
          
      <div className="bg-white rounded-2xl shadow-2xl max-w-3/5 w-full max-h-[100vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Job Position: {job.position}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">&times;</button>
        </div>

        <div className="space-y-6 text-gray-700">
          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider mb-2">Job Description</h4>
            <p className='leading-relaxed' >{job.description}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider mb-2">Job Requirements</h4>
            <p className='leading-relaxed' >{job.requirements}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`text-sm font-medium px-3 py-1 rounded-full text-white ${job.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
              {job.status}
            </span>
            <span className="text-sm text-gray-500">Posted on: {new Date(job.updatedAt).toLocaleDateString('en-US',{day: '2-digit', month: 'short', year: 'numeric'})}</span>
            <span className="text-sm text-gray-500">Location: {job.location}</span>
            <span className="text-sm text-gray-500">Type: {job.employmentType}</span>
            <span className="text-sm text-gray-500">Salary: {job.salary}</span>
          </div>
          <div className="border-t pt-4">
            <span className="text-sm text-gray-500">Job Tags : {job.tags?.join(', ') || 'No tags'}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium text-gray-800">Total Responses</span>
              <span className="text-3xl font-bold text-gray-600 mt-2">{totalApplications || 0}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium text-gray-800">Invited for Interview</span>
              <span className="text-3xl font-bold text-gray-600 mt-2">{totalInvitations || 0}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleJobUpdate}
            className="flex-1 bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            Update Job
          </button>
          <button
            onClick={handleJobDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
    );

export default JobViewModal;