import React from 'react';

const ProfileView = ({ profile, onEdit }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">
      {/* The new Edit button that calls the onEdit function from the parent */}
      <div className="flex justify-end mb-4">
        <button
          onClick={onEdit}
          className="flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
        >
          {/* ... SVG Icon ... */}
          Edit Profile
        </button>
      </div>
      
      {/* Profile Header (using the dynamic 'profile' prop) */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        {/* ... Avatar Code ... */}
        <div className="text-center md:text-left mt-2">
          {/* Displaying state data */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">{profile.name}</h1>
          <p className="text-xl sm:text-2xl text-cyan-700 font-semibold mt-1">{profile.title}</p>
          <p className="text-lg text-gray-600 mt-2">{profile.openTo}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About & Contact Section */}
        <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">About & Contact</h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            {profile.about} {/* Displaying state data */}
          </p>
          <div className="text-base text-gray-700 space-y-3">
            {/* Displaying state data for contact info */}
            <p className="flex items-center">Email: {profile.email}</p>
            <p className="flex items-center">Phone: {profile.phone}</p>
            <p className="flex items-center">Address: {profile.address}</p>
            <p className="flex items-center">Link: <a href={`https://${profile.linkedin}`} className="text-blue-600 hover:underline">{profile.linkedin}</a></p>
          </div>
        </div>
        
        {/* ... The rest of your Skills, Experience, Education sections go here ... */}
        <div className="md:col-span-2 space-y-8">
                       {/* Skills Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">Skills</h2>
              <div className="flex flex-wrap gap-3"> {/* Increased gap */}
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">JavaScript</span>
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">React</span>
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">Node.js</span>
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">Tailwind CSS</span>
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">REST APIs</span>
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">AWS</span>
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">MongoDB</span>
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">TypeScript</span>
                <span className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-purple-200 transition-colors">Docker</span>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">Work Experience</h2>
              <div className="mb-6 border-l-4 border-purple-500 pl-4 py-1"> {/* Added timeline-like border */}
                <h3 className="text-xl font-semibold text-gray-900">Lead Software Engineer</h3>
                <p className="text-cyan-700 text-base mb-2">Tech Innovators Inc. | 2020 - Present</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <p>Led a team of 5 engineers in the development of a new e-commerce platform from conception to launch.
                  Implemented robust CI/CD pipelines to automate deployment processes, reducing release time by 50%.</p>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <h3 className="text-xl font-semibold text-gray-900">Software Engineer</h3>
                <p className="text-cyan-700 text-base mb-2">Web Solutions Co. | 2017 - 2020</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <p>Led a team of 5 engineers in the development of a new e-commerce platform from conception to launch.
                  Implemented robust CI/CD pipelines to automate deployment processes, reducing release time by 50%.</p>
                </ul>
              </div>
            </div>

            {/* Education Section - NEW */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">Education</h2>
              <div className="mb-6 border-l-4 border-purple-500 pl-4 py-1">
                <h3 className="text-xl font-semibold text-gray-900">Master of Science in Computer Science</h3>
                <p className="text-cyan-700 text-base mb-2">University of Technology | 2015 - 2017</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <p>Led a team of 5 engineers in the development of a new e-commerce platform from conception to launch.
                  Implemented robust CI/CD pipelines to automate deployment processes, reducing release time by 50%.</p>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <h3 className="text-xl font-semibold text-gray-900">Bachelor of Engineering in Software Engineering</h3>
                <p className="text-cyan-700 text-base mb-2">State University | 2011 - 2015</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <p>Led a team of 5 engineers in the development of a new e-commerce platform from conception to launch.
                  Implemented robust CI/CD pipelines to automate deployment processes, reducing release time by 50%.</p>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;