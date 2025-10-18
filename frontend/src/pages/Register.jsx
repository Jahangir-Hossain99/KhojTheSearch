import React, { useState,useCallback,useEffect } from 'react';
import InputField from '../components/UI/InputField';
import EditableList from '../components/EditableList';
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../api/postsAPI';


const MAX_AVATAR_MB = 2;   // e.g., 2 MB
const MAX_RESUME_MB = 10;  // e.g., 10 MB
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

// Main application component

const Register = ({ onSubmit, onCancel = {} }) => {


  // Initial empty data structure for registration

const initialRegistrationData = {
  // Simple Fields
  name: '',
  password: '',
  about: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  role:'jobseeker',

  avatarUrl: '',
  resumeUrl: '',

  // Array Fields
  experience: [], // Starts empty
  education: [], // Starts empty
  skills: [],    // Starts empty

  // Helper State for Skills Input
  skillInput: '', // To manage the comma-separated string for skills
};

 

  // Initialize with the empty data structure
  const [formData, setFormData] = useState();
   useEffect(() => {
    const fetchPosts = async () => {
      const data = await registerUser();
      setFormData(data?data:initialRegistrationData);
    };
    fetchPosts();
  }, []);

  // Initialize the skillInput helper state
  const [skillInput, setSkillInput] = useState('');

  // NEW: File states
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null);

  const [resumeFile, setResumeFile] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // --------------------------
  // File Handlers (Avatar)
  // --------------------------
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      alert('Invalid avatar type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    // Validate size
    const sizeMB = bytesToMB(file.size);
    if (file.size > MAX_AVATAR_MB * 1024 * 1024) {
      alert(`Avatar is too large (${sizeMB} MB). Max allowed is ${MAX_AVATAR_MB} MB.`);
      return;
    }

    setAvatarFile(file);
    const preview = URL.createObjectURL(file);
    setAvatarPreviewUrl(preview);

    // Optional: clear any URL that user manually entered if you prefer file over URL
    // setFormData(prev => ({ ...prev, avatarUrl: '' }));
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl); // free memory
    }
    setAvatarPreviewUrl(null);
  };

  // --------------------------
  // File Handlers (Resume)
  // --------------------------
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
      alert('Invalid resume type. Please upload a PDF or Word document (.doc, .docx).');
      return;
    }

    // Validate size
    const sizeMB = bytesToMB(file.size);
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      alert(`Resume is too large (${sizeMB} MB). Max allowed is ${MAX_RESUME_MB} MB.`);
      return;
    }

    setResumeFile(file);
    // Optional: clear any URL if you prefer file over URL
    // setFormData(prev => ({ ...prev, resumeUrl: '' }));
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
  };

  // --------------------------
  // Submit
  // --------------------------
  const handleSubmit = () => {
    // 1. Convert the raw skillInput string to the final array format
    const finalSkillsArray = skillInput
      .split(',')        // Split by comma
      .map(s => s.trim()) // Remove extra spaces
      .filter(s => s);    // Remove any empty strings

    // 2. Create the final data object
    const finalFormData = {
      ...formData,
      // Overwrite skills with parsed array
      skills: finalSkillsArray,
      // Map UI 'name' -> backend 'fullName' (without breaking existing UI)
      fullName: formData.fullName || formData.name || '',
    };

    // Optional: clean up if you don’t want to send "name"
    // delete finalFormData.name;

    /**
     * 3. Call the parent onSubmit with both:
     *  - finalFormData (JSON data)
     *  - files object containing avatarFile and resumeFile (if selected)
     *
     * The parent can decide:
     *  - If avatarFile/resumeFile exist -> upload them first, get URLs, then send finalFormData with avatarUrl/resumeUrl.
     *  - If no files, but avatarUrl/resumeUrl texts are present -> send as-is.
     *  - If neither is present -> ignore.
     */
    onSubmit(finalFormData, { avatarFile, resumeFile });
  };

  // Handler for the Cancel button
  const handleCancel = () => {
    // onCancel();
    navigate(-1); // Navigate back to the previous page
  };

  // Handler for updating the entire array (used by EditableList and Skills)
  const handleArrayUpdate = (fieldName, updatedArray) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: updatedArray,
    }));
  };

  // Handler for removing an item from the array
  const handleRemoveItem = (fieldName, id) => {
    const updatedArray = formData[fieldName].filter(item => item.id !== id);
    handleArrayUpdate(fieldName, updatedArray);
  };

  // Handler for adding a new item to the array
  const handleAddItem = (fieldName, newItemTemplate) => {
    const newItem = {
      id: Date.now(), // Use a unique ID
      ...newItemTemplate
    };
    handleArrayUpdate(fieldName, [...formData[fieldName], newItem]);
  };

  const handleSkillsChange = useCallback((e) => {
    // Only update the local string state. Allows commas and spaces to be typed.
    setSkillInput(e.target.value);
  }, []);

  // --- TEMPLATES FOR NEW ARRAY ITEMS ---
  const newExperienceTemplate = { title: '', company: '', years: '' };
  const newEducationTemplate = { degree: '', institution: '', years: '' };

  // --- FIELD DEFINITIONS FOR EDITABLE LISTS ---
  const experienceFields = [
    { name: 'title', label: 'Job Title' },
    { name: 'company', label: 'Company' },
    { name: 'years', label: 'Duration' },
  ];

  const educationFields = [
    { name: 'degree', label: 'Degree/Certificate' },
    { name: 'institution', label: 'Institution' },
    { name: 'years', label: 'Years' }
  ];

  return (
    <div className="bg-white mt-18 shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">

      <div className="inline-block md:flex justify-between items-center">
        <h1 className="text-4xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-6">Register Your Profile</h1>
        {/* SUBMIT/CANCEL Buttons */}
        <div className="flex mb-2 space-x-3">
          <button
            onClick={handleCancel}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit} // Use handleSubmit here
            className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
          >
            Register Profile
          </button>
        </div>
      </div>

      {/* Profile Header Fields */}
      <form>
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <div className="text-center md:text-left mt-2 w-full">
          {/* Prefer fullName for backend, keep name for UI backward compatibility */}
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <div className='columns-2'>
            <InputField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} />
            <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About & Contact Section */}
        <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">About & Contact</h2>

          <InputField label="About Me" name="about" value={formData.about} isTextArea={true} onChange={handleChange} />

          <div className="text-base text-gray-700 space-y-3">
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
            <InputField label="LinkedIn URL (e.g., linkedin.com/in/janedoe)" name="linkedin" value={formData.linkedin} onChange={handleChange} />
          </div>

          {/* --- Avatar Upload + URL --- */}
          <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Avatar</h3>

            {/* Preview + remove */}
            {avatarPreviewUrl ? (
              <div className="mb-3">
                <img
                  src={avatarPreviewUrl}
                  alt="Avatar preview"
                  className="w-32 h-32 rounded-full object-cover border"
                />
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove Avatar
                  </button>
                </div>
              </div>
            ) : null}

            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept={ACCEPTED_AVATAR_TYPES.join(',')}
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {avatarFile && (
                <span className="text-sm text-gray-600">
                  {(avatarFile && avatarFile.name) ? `${avatarFile.name} (${bytesToMB(avatarFile.size)} MB)` : ''}
                </span>
              )}
            </div>

            <div className="mt-3">
              <InputField
                label="Avatar URL (optional)"
                name="avatarUrl"
                value={formData.avatarUrl || ''}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload an image (JPG/PNG/WEBP, ≤ {MAX_AVATAR_MB} MB) or paste a URL.</p>
          </div>

          {/* --- Resume Upload + URL --- */}
          <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Resume</h3>

            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept={ACCEPTED_RESUME_TYPES.join(',')}
                onChange={handleResumeChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              {resumeFile && (
                <>
                  <span className="text-sm text-gray-600">
                    {(resumeFile && resumeFile.name) ? `${resumeFile.name} (${bytesToMB(resumeFile.size)} MB)` : ''}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveResume}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>

            <div className="mt-3">
              <InputField
                label="Resume URL (optional)"
                name="resumeUrl"
                value={formData.resumeUrl || ''}
                onChange={handleChange}
                placeholder="https://... (PDF/DOC/DOCX)"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload a PDF/Word file (≤ {MAX_RESUME_MB} MB) or paste a URL.</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">

          {/* 1. Editable Work Experience */}
          <EditableList
            title="Work Experiences"
            items={formData.experience}
            fields={experienceFields}
            onUpdate={(arr) => handleArrayUpdate('experience', arr)}
            onRemove={(id) => handleRemoveItem('experience', id)}
            onAdd={() => handleAddItem('experience', newExperienceTemplate)}
          />

          {/* 2. Editable Education */}
          <EditableList
            title="Educations"
            items={formData.education}
            fields={educationFields}
            onUpdate={(arr) => handleArrayUpdate('education', arr)}
            onRemove={(id) => handleRemoveItem('education', id)}
            onAdd={() => handleAddItem('education', newEducationTemplate)}
          />

          {/* 3. Skills Array */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">Skills (Comma-Separated)</h2>
            <InputField
              label="Skills"
              name="skills"
              value={skillInput} // Uses the mutable string state
              onChange={handleSkillsChange} // Uses the stable handler
              isTextArea={true}
            />
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Register;
