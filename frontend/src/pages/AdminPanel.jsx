import React from 'react';

// Dummy data to simulate a backend API response
const dummyData = {
  stats: [
    { title: 'Total Jobs', value: 1245 },
    { title: 'New Applications', value: 85 },
    { title: 'Approved Listings', value: 1120 },
    { title: 'Pending Reviews', value: 55 },
  ],
  jobListings: [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      applicants: 15,
      status: 'Active',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      applicants: 8,
      status: 'Pending',
    },
    {
      id: 3,
      title: 'Full Stack Engineer',
      company: 'Innovate Corp',
      applicants: 22,
      status: 'Active',
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'Data Insights Co.',
      applicants: 5,
      status: 'Active',
    },
  ],
  recentApplicants: [
    {
      id: 101,
      name: 'Jane Doe',
      job: 'Senior Frontend Developer',
      date: '2025-09-15',
    },
    {
      id: 102,
      name: 'John Smith',
      job: 'Full Stack Engineer',
      date: '2025-09-14',
    },
    {
      id: 103,
      name: 'Emily White',
      job: 'UI/UX Designer',
      date: '2025-09-13',
    },
  ],
};

const AdminPanel = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            KhojTheJob Admin Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Overview of jobs and applications
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dummyData.stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
              <h3 className="text-gray-500 font-medium">{stat.title}</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Listings Table */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">
              Job Listings
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyData.jobListings.map((job) => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicants}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Applicants Table */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">
              Recent Applicants
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied For</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dummyData.recentApplicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{applicant.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.job}</td>
                      <td className="px-6 py-4 whitespace-now-wrap text-sm text-gray-500">{applicant.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;