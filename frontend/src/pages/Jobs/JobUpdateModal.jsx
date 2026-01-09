import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const JobUpdateModal = ({job,editData,setEditData,onClose}) => {
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/company/jobs/${job._id}`, editData,{
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });
      navigate(0);
      toast.success("Job updated successfully!");
      onClose(false);
    } catch (error) {
      toast.error("Failed to update job");
    }
  };

  return (
    <div className="fixed inset-0 z-52 flex items-center justify-center bg-opacity-50 backdrop-blur-sm p-4" onClick={() => onClose(false)}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-3/5 w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Update Job Details</h2>
        
        <form className="space-y-4" onClick={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Position</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded"
              defaultValue={job.position}
              onChange={(e) => setEditData({...editData, position: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Location</label>
            <input 
              type="text"
              className="w-full border p-2 rounded"
              defaultValue={job.location}
              onChange={(e) => setEditData({...editData, location: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Employment Type</label>
            <select 
                className="w-full border p-2 rounded"
                defaultValue={job.employmentType}
                onChange={(e) => setEditData({...editData, employmentType: e.target.value})}
            >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Freelance</option>
            </select>
            </div>
            <div>
            <label className="block text-sm font-bold mb-1">Salary</label>
            <input 
                type="text" 
                className="w-full border p-2 rounded"
                defaultValue={job.salary}
                onChange={(e) => setEditData({...editData, salary: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Status</label>
            <select 
                className="w-full border p-2 rounded"
                defaultValue={job.status}
                onChange={(e) => setEditData({...editData, status: e.target.value})}
            >
                <option>Active</option>
                <option>Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Tags (comma separated)</label>
            <input 
                type="text"
                className="w-full border p-2 rounded"
                defaultValue={job.tags?.join(', ')}
                onChange={(e) => setEditData({...editData, tags: e.target.value.split(',').map(tag => tag.trim())})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Description</label>
          <textarea 
            className="w-full border p-2 rounded h-32" 
            defaultValue={job.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
          />
        </div>
        <div>
            <label className="block text-sm font-bold mb-1">Requirements</label>
            <textarea 
              className="w-full border p-2 rounded h-32" 
              defaultValue={job.requirements}
              onChange={(e) => setEditData({...editData, requirements: e.target.value})}
            />
        </div>
        
        <div className="flex gap-3 pt-4">
          <button 
            onClick={handleSave}
            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold"
          >
            Save Changes
          </button>
          <button 
            onClick={() => onClose(false)}
            className="flex-1 bg-gray-200 py-3 rounded-xl font-bold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
    );
};

export default JobUpdateModal;