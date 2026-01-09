import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you have React Router set up
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
  const { userData } = useAuth();
  return (
    // Centered layout, taking up the full viewport height minus typical header
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-6 pt-20">
      <div className="text-center bg-white p-10 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-500 hover:shadow-3xl">
        
        {/* Large Error Code and Emoji */}
        <h1 className="text-9xl font-extrabold text-purple-600 mb-4 tracking-wider">
          404
        </h1>

        {/* Descriptive Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Oops! It looks like you've landed on a page that doesn't exist.
          The job listing or profile you were looking for might have been moved or deleted.
        </p>

        {/* Call to Action Button */}
        <Link 
          to={`${userData?.role === 'jobseeker' ? '/profile' : userData?.role === 'employer' ? '/dashboard' : '/'}`} // Redirects user to the main home page
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-cyan-600 hover:bg-cyan-700 transition-transform duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          {/* Home Icon (using inline SVG for broad compatibility) */}
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m-6-4h4"></path></svg>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
