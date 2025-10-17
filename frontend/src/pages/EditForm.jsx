import React, { useState, useCallback, useEffect } from 'react';
import EditableList from '../components/EditableList';
import InputField from '../components/UI/InputField';

const MAX_AVATAR_MB = 2;   // 2 MB
const MAX_RESUME_MB = 10;  // 10 MB

const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);
const safeUrl = (url) => {
  if (!url) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};
const getInitials = (name = '') => {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase() || 'U';
};

const EditForm = ({ profileData, onSave, onCancel }) => {
  // Local state to manage form inputs, initialized with the current profile data
  const [formData, setFormData] = useState(profileData);

  // Skills input string
  const [skillInput, setSkillInput] = useState(
    Array.isArray(profileData.skills) ? profileData.skills.join(', ') : ''
  );

  // NEW: File states
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(
    safeUrl(profileData.avatarUrl) || null
  );
  const [avatarPreviewIsObjectUrl, setAvatarPreviewIsObjectUrl] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    // Cleanup any object URL when unmounting or when preview changes
    return () => {
      if (avatarPreviewIsObjectUrl && avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl, avatarPreviewIsObjectUrl]);

  // --------------------------
  // Generic handler for input changes (simple fields)
  // --------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // --------------------------
  // Avatar (file) handlers
  // --------------------------
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      alert('Invalid avatar type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > MAX_AVATAR_MB * 1024 * 1024) {
      alert(
        `Avatar is too large (${bytesToMB(file.size)} MB). Max allowed is ${MAX_AVATAR_MB} MB.`
      );
      return;
    }

    setAvatarFile(file);

    // Clean up previous object URL if any
    if (avatarPreviewIsObjectUrl && avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }

    const preview = URL.createObjectURL(file);
    setAvatarPreviewUrl(preview);
    setAvatarPreviewIsObjectUrl(true);

    // Optionally clear URL field if you prefer file to take precedence
    // setFormData(prev => ({ ...prev, avatarUrl: '' }));
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);

    if (avatarPreviewIsObjectUrl && avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }
    setAvatarPreviewUrl(safeUrl(formData.avatarUrl) || null);
    setAvatarPreviewIsObjectUrl(false);
  };

  const clearAvatarUrl = () => {
    setFormData((prev) => ({ ...prev, avatarUrl: '' }));
    if (!avatarFile) {
      setAvatarPreviewUrl(null);
      setAvatarPreviewIsObjectUrl(false);
    }
  };

  // --------------------------
  // Resume (file) handlers
  // --------------------------
  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
      alert('Invalid resume type. Please upload a PDF or Word document (.doc, .docx).');
      return;
    }

    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      alert(
        `Resume is too large (${bytesToMB(file.size)} MB). Max allowed is ${MAX_RESUME_MB} MB.`
      );
      return;
    }

    setResumeFile(file);
    // Optionally clear URL if you prefer file to take precedence
    // setFormData(prev => ({ ...prev, resumeUrl: '' }));
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
  };

  // --------------------------
  // Save
  // --------------------------
  const handleSave = () => {
    // 1. Convert the raw skillInput string to the final array format
    const finalSkillsArray = skillInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s);

    // 2. Map UI 'name' -> backend 'fullName' (keep 'name' for UI compatibility)
    const finalFormData = {
      ...formData,
      skills: finalSkillsArray,
      fullName: formData.fullName || formData.name || '',
    };
    // Optional: remove 'name' if you want to fully migrate to 'fullName'
    // delete finalFormData.name;

    /**
     * 3. Pass both data and files to parent. Parent can:
     *  - Upload avatarFile/resumeFile first -> get URLs -> set finalFormData.avatarUrl/resumeUrl -> save.
     *  - Or if only URLs are present, save directly.
     */
    onSave(finalFormData, { avatarFile, resumeFile });
  };

  // Handler for the Cancel button
  const handleCancel = () => {
    onCancel();
  };

  // Handler for updating the entire array (used by EditableList and Skills)
  const handleArrayUpdate = (fieldName, updatedArray) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: updatedArray,
    }));
  };

  // Handler for removing an item from the array
  const handleRemoveItem = (fieldName, id) => {
    const updatedArray = formData[fieldName].filter((item) => item.id !== id);
    handleArrayUpdate(fieldName, updatedArray);
  };

  // Handler for adding a new item to the array
  const handleAddItem = (fieldName, newItemTemplate) => {
    const newItem = {
      id: Date.now(), // Use a unique ID
      ...newItemTemplate,
    };
    handleArrayUpdate(fieldName, [...formData[fieldName], newItem]);
  };

  const handleSkillsChange = useCallback((e) => {
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
    { name: 'years', label: 'Years' },
  ];

  const displayName = formData.fullName || formData.name || 'Anonymous';
  const previewAvatarSrc = avatarPreviewUrl || safeUrl(formData.avatarUrl);
  const resumeHref = safeUrl(formData.resumeUrl);

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">
      {/* SAVE/CANCEL Buttons */}
      <div className="flex justify-end mb-6 space-x-3">
        <button
          onClick={handleCancel}
          className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
        >
          Save Changes
        </button>
      </div>

      {/* Profile Header Fields + Avatar Preview */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8 gap-4">
        {/* Avatar Preview */}
        <div className="flex-shrink-0">
          {previewAvatarSrc ? (
            <img
              src={previewAvatarSrc}
              alt={`${displayName}'s avatar`}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-purple-100 border flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-purple-700">
                {getInitials(displayName)}
              </span>
            </div>
          )}
        </div>

        <div className="text-center md:text-left mt-2 w-full">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <div className="columns-2">
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              type="email"
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About & Contact Section - Now with Avatar & Resume upload/URL */}
        <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">
            About &amp; Contact
          </h2>

          <InputField
            label="About Me"
            name="about"
            value={formData.about}
            isTextArea={true}
            onChange={handleChange}
          />

          <div className="text-base text-gray-700 space-y-3">
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <InputField
              label="LinkedIn URL (e.g., linkedin.com/in/username)"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>

          {/* --- Avatar Upload + URL --- */}
          <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Avatar</h3>

            {/* File input */}
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept={ACCEPTED_AVATAR_TYPES.join(',')}
                onChange={handleAvatarChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {avatarFile && (
                <span className="text-sm text-gray-600">
                  {avatarFile.name} ({bytesToMB(avatarFile.size)} MB)
                </span>
              )}
              {avatarFile && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            {/* URL input + clear */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1">
                <InputField
                  label="Avatar URL (optional)"
                  name="avatarUrl"
                  value={formData.avatarUrl || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <button
                type="button"
                onClick={clearAvatarUrl}
                className="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Clear URL
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Upload an image (JPG/PNG/WEBP, ≤ {MAX_AVATAR_MB} MB) or paste a URL.
            </p>
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
                    {resumeFile.name} ({bytesToMB(resumeFile.size)} MB)
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

            {/* Quick actions: View / Download current resume (if URL exists) */}
            {resumeHref && (
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-blue-50 text-blue-700 font-medium rounded-md hover:bg-blue-100 transition-colors"
                >
                  View Resume
                </a>
                <a
                  href={resumeHref}
                  download
                  className="px-3 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-md hover:bg-indigo-100 transition-colors"
                >
                  Download
                </a>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-1">
              Upload a PDF/Word file (≤ {MAX_RESUME_MB} MB) or paste a URL.
            </p>
          </div>
        </div>

        {/* Right column: Experience / Education / Skills */}
        <div className="md:col-span-2 space-y-8">
          {/* 1. Editable Work Experience */}
          {console.log(formData.experience)}
          <EditableList
            title="Work Experiences"
            items={formData.experience}
            fields={experienceFields}
            onUpdate={(arr) => handleArrayUpdate('experience', arr)}
            onRemove={(id) => handleRemoveItem('experience', id)}
            onAdd={() => handleAddItem('experience', newExperienceTemplate)}
          />

          {/* 2. Editable Education */}
          {console.log(formData.experience)}
          <EditableList
            title="Educations"
            items={formData.education}
            fields={educationFields}
            onUpdate={(arr) => handleArrayUpdate('education', arr)}
            onRemove={(id) => handleRemoveItem('education', id)}
            onAdd={() => handleAddItem('education', newEducationTemplate)}
          />

          {/* 3. Simple Skills Array */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">
              Skills (Comma-Separated)
            </h2>
            <InputField
              label="Skills"
              name="skills"
              value={skillInput}
              onChange={handleSkillsChange}
              isTextArea={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;