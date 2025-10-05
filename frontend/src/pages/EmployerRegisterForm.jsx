import React, { useState } from 'react';
import InputField from '../components/UI/InputField'; // Reusing your generic InputField
import { useNavigate } from 'react-router-dom';

// Initial empty data structure for Employer registration
const initialEmployerData = {
    companyName: '',
    recruiterName: '',
    email: '',
    password: '',
    industry: '', 
    companySize: '', 
    companyAddress: '', 
    companyWebsite: '', 
    companyDescription: '', 
};

// Simple dropdown options for demonstration
const industryOptions = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Other'
];
const sizeOptions = [
    '1-50 (Small)', '51-200 (Medium)', '201-1000 (Large)', '1000+ (Enterprise)'
];


const EmployerRegisterForm = ({ onSubmit }) => {
    
    const [formData, setFormData] = useState(initialEmployerData);
    const navigate = useNavigate();

    // Generic handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for the Submit button
    const handleSubmit = () => {
        // Basic Validation Example
        if (!formData.companyName || !formData.email || !formData.password) {
            alert("Please fill in Company Name, Email, and Password.");
            return;
        }

        // Pass the complete employer data for API submission
        onSubmit(formData);
    };

    // Handler for the Cancel button
    const handleCancel = () => {
        navigate(-1); // Navigate back to the previous page
    };
    
    // --- Select Field Helper (often needed for Employer forms) ---
    const SelectField = ({ label, name, value, onChange, options }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
            >
                <option value="" disabled>Select {label}</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
    // -----------------------------------------------------------------

    return (
        <div className="bg-white mt-18 shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">
            
            <div className="inline-block md:flex justify-between items-center">
                <h1 className="text-4xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-6">Register as an Employer</h1>
                
                <div className="flex mb-2 space-x-3">
                    <button
                        onClick={handleCancel}
                        className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Create Company Account
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Account & Company Info Section */}
                <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-300">Account Credentials</h2>
                    
                    <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
                    <InputField label="Recruiter Name" name="recruiterName" value={formData.recruiterName} onChange={handleChange} />

                    <div className="space-y-3 mt-4">
                        <InputField label="Official Email" name="email" value={formData.email} type="email" onChange={handleChange} />
                        <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                    </div>
                </div>

                {/* Company Details Section */}
                <div className="md:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-300">Company Details</h2>
                    
                    {/* Select Fields */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <SelectField 
                            label="Industry" 
                            name="industry" 
                            value={formData.industry} 
                            onChange={handleChange} 
                            options={industryOptions} 
                        />
                        <SelectField 
                            label="Company Size" 
                            name="companySize" 
                            value={formData.companySize} 
                            onChange={handleChange} 
                            options={sizeOptions} 
                        />
                    </div>
                    
                    {/* Other Inputs */}
                    <InputField label="Company Website URL" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} />
                    <InputField label="Headquarters Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />
                    <InputField label="Company Description" name="companyDescription" value={formData.companyDescription} isTextArea={true} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default EmployerRegisterForm;