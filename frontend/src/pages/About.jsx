import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            About KhojTheJob
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Connecting talent with opportunity, one job at a time.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-cyan-400 pb-4 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At KhojTheJob, our mission is to simplify the job search and hiring process. We believe that finding the right job should be a seamless and empowering experience for everyone. We're dedicated to building an intelligent platform that not only matches candidates with the best opportunities but also provides the tools and resources they need to succeed in their careers.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-cyan-400 pb-4 mb-6">Our Story</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Founded in 2021 by a small team of industry veterans, KhojTheJob was born out of a shared frustration with the complexities of traditional job boards. We envisioned a platform that was intuitive, efficient, and genuinely helpful. Starting with a simple prototype, we have grown into a trusted resource for job seekers and employers alike.
            </p>
            <p>
              Our journey has been one of continuous learning and innovation. We've listened to our community, adapted to the changing market, and built features that solve real-world problems. Today, we're proud to have helped thousands of professionals find their next career move and hundreds of companies discover top-tier talent.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-cyan-400 pb-4 mb-6 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center">
              <img
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300 shadow-md"
                src="https://via.placeholder.com/150"
                alt="Team Member 1"
              />
              <h3 className="text-xl font-semibold text-gray-900">John Smith</h3>
              <p className="text-cyan-600">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center">
              <img
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300 shadow-md"
                src="https://via.placeholder.com/150"
                alt="Team Member 2"
              />
              <h3 className="text-xl font-semibold text-gray-900">Emily White</h3>
              <p className="text-cyan-600">Chief Technology Officer</p>
            </div>
            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center">
              <img
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300 shadow-md"
                src="https://via.placeholder.com/150"
                alt="Team Member 3"
              />
              <h3 className="text-xl font-semibold text-gray-900">Michael Brown</h3>
              <p className="text-cyan-600">Lead UX Designer</p>
            </div>
            {/* Team Member 4 */}
            <div className="flex flex-col items-center text-center">
              <img
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300 shadow-md"
                src="https://via.placeholder.com/150"
                alt="Team Member 4"
              />
              <h3 className="text-xl font-semibold text-gray-900">Sarah Lee</h3>
              <p className="text-cyan-600">Head of Marketing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;