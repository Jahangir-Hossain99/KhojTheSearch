import React from 'react';

// Assuming you'll pass an onDelete function from the parent component
const ProfileView = ({ profile, onEdit, onDelete }) => {
  // Helpers
  const displayName = profile?.fullName || profile?.name || 'Anonymous';
  const BACKEND_BASE_URL = 'http://localhost:5000';
  const safeUrl = (url) => {
    if (!url) return null;
    return(`${BACKEND_BASE_URL}${url.URL}`)
  };
  const getInitials = (name = '') => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase() || 'U';
  };

  const linkedinHref = safeUrl(profile?.linkedin);
  const resumeHref = safeUrl(profile?.userData?.resumeUrl);
  const avatarSrc =  safeUrl(profile?.userData?.avatarUrl);

  return (
    <div className="bg-zinc-50 shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">
      {/* Profile Header: Avatar, Name, Title, Edit/Delete Buttons */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6"> 
        {/* --- 1. Avatar & Info Block (Left Side) --- */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 flex-grow">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={`${displayName}'s avatar`}
                className="w-26 h-26 md:w-30 md:h-30 rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-900 border flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {getInitials(displayName)}
                </span>
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="text-center md:text-left mt-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              {displayName}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 font-semibold mt-1">
              {profile?.title}
            </p>
          </div>
        </div>

        {/* --- 2. Edit & Delete Buttons (Right Side) --- */}
        {/* self-start ensures buttons are aligned to the top of the entire header block */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-2 self-center md:self-start">
          
          <button
            onClick={onEdit}
            className="flex items-center px-4 py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors whitespace-nowrap shadow-md"
          >
            Edit Profile
          </button>

          <button
            onClick={onDelete}
            className="flex items-center px-4 py-2 bg-red-700 text-white font-semibold rounded-md border-none hover:bg-red-600 transition-colors whitespace-nowrap shadow-md"
          >
            Delete Profile
          </button>
        </div>

      </div>
      {/* End Profile Header */}


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About & Contact Section */}
        <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 pb-2 border-b-2 border-gray-700">
            About &amp; Contact
          </h2>
          <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-md font-semibold text-gray-800 mb-2">
            About Me:<br></br> 
            <span className="font-normal">
              <span className="text-gray-700 mb-5 leading-relaxed">
                {profile?.about}
              </span>
            </span>
          </p>
          </div>

          <div className="text-base text-gray-800 space-y-3">
            {/* ... (Contact details remain the same) ... */}
            <p className="flex items-center">Email: {profile?.email}</p>
            <p className="flex items-center">Phone: {profile?.phone}</p>
            <p className="flex items-center">Address: {profile?.address}</p>

            {/* LinkedIn: auto-prefix https:// if missing */}
            {profile?.linkedin ? (
              <p className="flex items-center">
                Link:{' '}
                <a
                  href={linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 wrap-anywhere hover:underline ml-1"
                >
                  {profile.linkedin}
                </a>
              </p>
            ) : null}
          </div>

          {/* Also show Resume link in contact card if you prefer */}
          {resumeHref && (
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`${resumeHref}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-50 text-gray-700 font-medium rounded-md hover:bg-blue-100 transition-colors"
              >
                View Resume
              </a>
              <a
                href={resumeHref}
                download
                className="px-3 py-2 bg-blue-50 text-gray-700 font-medium rounded-md hover:bg-blue-100 transition-colors"
              >
                Download
              </a>
            </div>
          )}
        </div>

        {/* Skills / Experience / Education */}
        <div className="md:col-span-2 space-y-8">
          {/* Skills Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-700">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {Array.isArray(profile?.skills) && profile.skills.length > 0 ? (
                profile.skills.map((skill, idx) => (
                  <span
                    key={`${skill}-${idx}`}
                    className="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No skills added yet.</span>
              )}
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-700">
              Work Experience
            </h2>

            {Array.isArray(profile?.experience) && profile.experience.length > 0 ? (
              profile.experience.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  className="mb-6 border-l-4 border-gray-700 pl-4 py-1"
                >
                  <h3 className="text-xl font-semibold text-gray-700">{exp.title}</h3>
                  <p className="text-gray-700 text-base mb-2">
                    {exp.company} {exp.years ? `| ${exp.years}` : ''}
                  </p>
                  {exp.description ? (
                    <p className="text-gray-700">{exp.description}</p>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-gray-700">No experience added yet.</p>
            )}
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-700">
              Education
            </h2>

            {Array.isArray(profile?.education) && profile.education.length > 0 ? (
              profile.education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="mb-6 border-l-4 border-gray-700 pl-4 py-1"
                >
                  <h3 className="text-xl font-semibold text-gray-700">{edu.degree}</h3>
                  <p className="text-gray-700 text-base mb-2">
                    {edu.institution} {edu.years ? `| ${edu.years}` : ''}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No education added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
