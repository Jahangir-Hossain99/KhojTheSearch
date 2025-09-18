import React, { useState } from 'react';

const EditForm = ({ profileData, onSave, onCancel }) => {
  // Use local state to hold changes (draft data)
  const [formData, setFormData] = useState(profileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update only the field that changed
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the completed data back to the parent component (UserProfile)
    onSave(formData); 
  };
  
  // Helper components for cleaner form structure (optional but helpful)
  const InputField = ({ label, name, type = 'text', value }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
      />
    </div>
  );
  
  const TextAreaField = ({ label, name, value }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows="3"
        value={value}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 resize-none"
      ></textarea>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-inner max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-purple-300">Edit Profile Information</h2>
      
      {/* Example Fields */}
      <InputField label="Full Name" name="name" value={formData.name} />
      <InputField label="Title" name="title" value={formData.title} />
      <TextAreaField label="About Me" name="about" value={formData.about} />
      
      {/* Contact Fields */}
      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-4">Contact Information</h3>
      <InputField label="Email" name="email" type="email" value={formData.email} />
      {/* ... other fields from profileData ... */}

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel} // Calls setIsEditing(false) in parent
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditForm;