import React from 'react';
// 1. Import the hook needed for navigation
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // 2. Initialize the navigate function
  const navigate = useNavigate();

  // Function to handle the redirect to the job details page
  const handleViewDetails = (jobId) => {
    // Navigates to the path defined in your main router: /jobs/:id
    navigate(`/jobs/${jobId}`);
  };

  // Sample data for job listings
  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      salary: '$120,000 - $150,000',
      isNegotiable: false,
      nature: 'Full-time',
      level: 'Senior',
      experience: '5+ Years'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      company: 'Creative Minds Co.',
      location: 'Remote',
      salary: 'Negotiable',
      isNegotiable: true,
      nature: 'Full-time',
      level: 'Mid-level',
      experience: '3-5 Years'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Data Insights LLC',
      location: 'San Francisco, CA',
      salary: '$90,000 - $110,000',
      isNegotiable: false,
      nature: 'Full-time',
      level: 'Entry-level',
      experience: '0-1 Years'
    },
    {
      id: 4,
      title: 'Product Manager',
      company: 'Innovate Corp.',
      location: 'London, UK',
      salary: '£70,000 - £90,000',
      isNegotiable: false,
      nature: 'Full-time',
      level: 'Senior',
      experience: '7+ Years'
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      company: 'Global Brands Ltd.',
      location: 'Singapore',
      salary: 'Negotiable',
      isNegotiable: true,
      nature: 'Contract',
      level: 'Junior',
      experience: '1-3 Years'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      company: 'CloudWorks',
      location: 'Remote',
      salary: '$130,000 - $160,000',
      isNegotiable: false,
      nature: 'Full-time',
      level: 'Senior',
      experience: '5+ Years'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Job Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-blue-600 font-medium my-2">{job.company}</p>
            
            <div className="text-gray-600 space-y-2 mb-4">
              <div className="flex items-center">
                <span className="mr-2">&#x1F4CD;</span>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x1F4B5;</span>
                <span>{job.salary} {job.isNegotiable && <span className="text-xs text-gray-500">(Negotiable)</span>}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x1F5D3;&#xFE0F;</span>
                <span>{job.nature}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">&#x1F4CC;</span>
                <span>{job.level}</span>
              </div>
            </div>
            
            {/* 3. Modified Button with onClick handler */}
            <button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              // Pass the current job's unique ID to the handler
              onClick={() => handleViewDetails(job.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
