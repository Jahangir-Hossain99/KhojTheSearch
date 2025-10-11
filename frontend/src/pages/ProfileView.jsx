import React from 'react';

const ProfileView = ({ profile, onEdit }) => {
  // Helpers
  const displayName = profile?.fullName || profile?.name || 'Anonymous';
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

  const linkedinHref = safeUrl(profile?.linkedin);
  const resumeHref = safeUrl(profile?.resumeUrl);
  const avatarSrc = safeUrl(profile?.avatarUrl);

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">

      {/* Edit button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onEdit}
          className="flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
        >
          {/* You can add an edit SVG icon here */}
          Edit Profile
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8 gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatarSrc ? (
            <img
              src={avatarSrc}
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

        <div className="text-center md:text-left mt-2">
          {/* Name & Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            {displayName}
          </h1>
          <p className="text-xl sm:text-2xl text-cyan-700 font-semibold mt-1">
            {profile?.title}
          </p>

          {/* Resume actions (View / Download) */}
          {resumeHref && (
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                View Resume
              </a>
              <a
                href={resumeHref}
                download
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
              >
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About & Contact Section */}
        <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">
            About &amp; Contact
          </h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            {profile?.about}
          </p>

          <div className="text-base text-gray-700 space-y-3">
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
                  className="text-blue-600 hover:underline ml-1"
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
        </div>

        {/* Skills / Experience / Education */}
        <div className="md:col-span-2 space-y-8">
          {/* Skills Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {Array.isArray(profile?.skills) && profile.skills.length > 0 ? (
                profile.skills.map((skill, idx) => (
                  <span
                    key={`${skill}-${idx}`}
                    className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors"
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">
              Work Experience
            </h2>

            {Array.isArray(profile?.experience) && profile.experience.length > 0 ? (
              profile.experience.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  className="mb-6 border-l-4 border-purple-500 pl-4 py-1"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-cyan-700 text-base mb-2">
                    {exp.company} {exp.years ? `| ${exp.years}` : ''}
                  </p>
                  {exp.description ? (
                    <p className="text-gray-700">{exp.description}</p>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No experience added yet.</p>
            )}
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">
              Education
            </h2>

            {Array.isArray(profile?.education) && profile.education.length > 0 ? (
              profile.education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="mb-6 border-l-4 border-purple-500 pl-4 py-1"
                >
                  <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-cyan-700 text-base mb-2">
                    {edu.institution} {edu.years ? `| ${edu.years}` : ''}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;