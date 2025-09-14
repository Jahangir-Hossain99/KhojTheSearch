import React from 'react';

const Profile = () => {
  return (
    // Added pt-20 to push content below a typical fixed navbar. Adjusted max-w to be wider.
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20"> {/* Added padding top for navbar */}
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto"> {/* Increased max-w and adjusted padding */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8"> {/* Increased mb */}
          <div className="w-36 h-36 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8 border-4 border-gray-600 shadow-md"> {/* Increased size and darker border */}
            <img 
              src="https://via.placeholder.com/180" // Slightly larger placeholder
              alt="Profile Avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center md:text-left mt-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">Jane Doe</h1> {/* Larger, bolder name */}
            <p className="text-xl sm:text-2xl text-cyan-700 font-semibold mt-1">Senior Software Engineer</p>
            <p className="text-lg text-gray-600 mt-2">Open to new opportunities in the tech industry.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Increased gap */}
          {/* About & Contact Section */}
          <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200"> {/* Added subtle border */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">About & Contact</h2>
            <p className="text-gray-700 mb-5 leading-relaxed"> {/* Adjusted leading */}
              A passionate and results-driven senior software engineer with over 10 years of experience in full-stack development. I specialize in building scalable web applications and leading high-performing engineering teams, committed to delivering high-quality, impactful software solutions.
            </p>
            <div className="text-base text-gray-700 space-y-3"> {/* Adjusted text size and spacing */}
              <p className="flex items-center">
                <span className="material-icons text-stone-700 font-bold text-xl mr-3">Email:</span> jane.doe@email.com
              </p>
              <p className="flex items-center">
                <span className="material-icons text-stone-700 font-bold text-xl mr-3">Phone:</span> (123) 456-7890
              </p>
              <p className="flex items-center">
                <span className="material-icons text-stone-700  font-bold text-xl mr-3">Address:</span> San Francisco, CA
              </p>
              <p className="flex items-center">
                <span className="material-icons text-stone-700 font-bold text-xl mr-3">Link:</span> <a href="#" className="text-blue-600 hover:underline">linkedin.com/in/janedoe</a>
              </p>
            </div>
          </div>

          {/* Right Column: Skills, Experience, Education */}
          <div className="md:col-span-2 space-y-8"> {/* Increased space between sections */}
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
                  <li>Led a team of 5 engineers in the development of a new e-commerce platform from conception to launch.</li>
                  <li>Increased application performance by 30% through comprehensive code optimization and refactoring.</li>
                  <li>Implemented robust CI/CD pipelines to automate deployment processes, reducing release time by 50%.</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <h3 className="text-xl font-semibold text-gray-900">Software Engineer</h3>
                <p className="text-cyan-700 text-base mb-2">Web Solutions Co. | 2017 - 2020</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <li>Developed and maintained features for several high-traffic client websites using React, Node.js, and GraphQL.</li>
                  <li>Collaborated closely with designers and product managers to deliver a seamless and engaging user experience.</li>
                  <li>Mentored junior developers, facilitating their growth and contribution to team projects.</li>
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
                  <li>Specialized in Distributed Systems and Machine Learning.</li>
                  <li>Thesis: "Scalable Real-time Data Processing using Apache Kafka."</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-1">
                <h3 className="text-xl font-semibold text-gray-900">Bachelor of Engineering in Software Engineering</h3>
                <p className="text-cyan-700 text-base mb-2">State University | 2011 - 2015</p>
                <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
                  <li>Graduated with Honors.</li>
                  <li>Relevant Coursework: Data Structures, Algorithms, Web Development.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;