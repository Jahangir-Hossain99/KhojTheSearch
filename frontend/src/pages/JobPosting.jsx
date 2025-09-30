import React, { useState } from 'react';

const JobPosting = () => {
  // State to hold all form data
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    locationType: 'on-site',
    location: '',
    salaryMin: '',
    salaryMax: '',
    salaryType: 'annual',
    jobType: 'full-time',
    level: 'mid-level',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

  // Handles updates to all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // --- Mock API Call Simulation ---
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Log data to console (in a real app, this goes to an API)
      console.log('Job Data Submitted:', jobData); 

      // Simulate a successful submission
      setSubmissionStatus('success');
      
      // Optionally reset the form after successful submission
      // setJobData({ ...initial state reset... });
    }, 2000); 
  };

  // Common Input Field Component for DRY code
  const InputField = ({ label, name, type = 'text', value, placeholder, required = true }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
      />
    </div>
  );

  // Common Select Field Component
  const SelectField = ({ label, name, value, options, required = true }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-6 sm:p-10 border border-gray-200">
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">Post a New Job</h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Fill out the details below to publish your job listing.
        </p>

        {/* Submission Status Message */}
        {submissionStatus === 'success' && (
          <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            Job successfully posted! Thank you.
          </div>
        )}
        {submissionStatus === 'error' && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            Error submitting job. Please try again later.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- Section 1: Job Basics --- */}
          <div className="border border-purple-300 p-6 rounded-lg bg-purple-50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-purple-400">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Job Title" 
                name="title" 
                value={jobData.title}
                placeholder="e.g., Senior Frontend Developer"
              />
              <InputField 
                label="Company Name" 
                name="company" 
                value={jobData.company}
                placeholder="e.g., Tech Innovators Inc."
                disabled={true}
              />
            </div>
            
            <SelectField
              label="Job Level"
              name="level"
              value={jobData.level}
              options={[
                { value: 'entry-level', label: 'Entry Level' },
                { value: 'mid-level', label: 'Mid-Level' },
                { value: 'senior', label: 'Senior' },
                { value: 'executive', label: 'Executive' },
              ]}
            />
            
          </div>

          {/* --- Section 2: Description & Requirements --- */}
          <div className="border border-cyan-300 p-6 rounded-lg bg-cyan-50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-cyan-400">Content</h3>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description (Key Responsibilities)
              </label>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={jobData.description}
                onChange={handleChange}
                placeholder="Provide a detailed overview of the role and key responsibilities..."
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 resize-y transition duration-150"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills & Qualifications
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows="3"
                value={jobData.requirements}
                onChange={handleChange}
                placeholder="List must-have qualifications, separated by commas or line breaks."
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 resize-y transition duration-150"
              ></textarea>
            </div>
          </div>
          
          {/* --- Section 3: Location & Type --- */}
          <div className="border border-amber-300 p-6 rounded-lg bg-amber-50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-amber-400">Work Details</h3>

            <SelectField
              label="Employment Type"
              name="jobType"
              value={jobData.jobType}
              options={[
                { value: 'full-time', label: 'Full-time' },
                { value: 'part-time', label: 'Part-time' },
                { value: 'contract', label: 'Contract' },
                { value: 'internship', label: 'Internship' },
              ]}
            />
            
            <SelectField
              label="Workplace Type"
              name="locationType"
              value={jobData.locationType}
              options={[
                { value: 'on-site', label: 'On-site' },
                { value: 'hybrid', label: 'Hybrid' },
                { value: 'remote', label: 'Remote' },
              ]}
            />

            {/* Location field conditional on not being fully remote */}
            {jobData.locationType !== 'remote' && (
              <InputField 
                label="Job Location (City, State/Country)" 
                name="location" 
                value={jobData.location}
                placeholder="e.g., New York, NY"
              />
            )}
            
          </div>

          {/* --- Section 4: Salary --- */}
          <div className="border border-green-300 p-6 rounded-lg bg-green-50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-green-400">Compensation</h3>
            
            <SelectField
              label="Salary Frequency"
              name="salaryType"
              value={jobData.salaryType}
              options={[
                { value: 'annual', label: 'Annual Salary' },
                { value: 'hourly', label: 'Hourly Rate' },
                { value: 'monthly', label: 'Monthly Stipend' },
              ]}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField 
                label="Minimum Salary" 
                name="salaryMin" 
                type="number" 
                value={jobData.salaryMin}
                placeholder="e.g., 90000"
                required={false}
              />
              <InputField 
                label="Maximum Salary" 
                name="salaryMax" 
                type="number" 
                value={jobData.salaryMax}
                placeholder="e.g., 120000"
                required={false}
              />
            </div>
          </div>

          {/* --- Submit Button --- */}
          <button
            type="submit"
            className={`w-full py-4 text-xl font-semibold rounded-lg shadow-lg transition duration-300 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-[1.01]'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting Job...
              </span>
            ) : (
              'Publish Job'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPosting;
