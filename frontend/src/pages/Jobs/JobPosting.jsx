import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {useAuth } from '../../context/AuthContext';

const InputList = [
    { label: "Job Position", name: "position", type: "text", placeholder: "Enter job position", required: false },
    { 
    label: "Employment Type", 
    name: "employmentType", 
    type: "select",
    placeholder: "Select Employment Type", 
    required: false,
    options: [
        { label: "Full-Time", value: "Full-Time" },
        { label: "Part-Time", value: "Part-Time" },
        { label: "Contract", value: "Contract" },
        { label: "Internship", value: "Internship" },
        { label: "Freelance", value: "Freelance" }
    ]
    },
    { 
    label: "seniority Level", 
    name: "seniority", 
    type: "select",
    placeholder: "Select seniority Level", 
    required: false,
    options: [
        { label: "Intern", value: "Intern" },
        { label: "Junior", value: "Junior" },
        { label: "Mid", value: "Mid" },
        { label: "Senior", value: "Senior" },
        { label: "Lead", value: "Lead" }
    ]
    },
    { label: "Salary", name: "salary", type: "text", placeholder: "Enter salary range", required: false },
    { label: "Job Location", name: "location", type: "text", placeholder: "Enter job location", required: false },
    { label: "Status" , name: "status", type: "select", placeholder: "Select Job Status", required: false,
    options: [
        { label: "Active", value: "Active", default: true },
        { label: "Inactive", value: "Inactive" },
    ]
    },
    { label: "Tags", name: "tags", type: "textarea", placeholder: `"," Comma Separated`, required: false, colSpan: 2 },
    { label: "Job Requirements", name: "requirements", type: "textarea", placeholder: "Briefly describe the job requirements", required: false, colSpan: 2 },
    { label: "Job Description", name: "description", type: "textarea", placeholder: "Briefly describe the job responsibilities ", required: false, colSpan: 2 },
];

const JobPosting = ({handleSubmit}) => {   
    
    const [formData,setFormData] = useState({});

    const {userData} = useAuth();

    const handleFormChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const onSubmit =  async (e) => {
        e.preventDefault();
        const companyData = {
            ...formData,
            companyId: userData._id,
            companyName:userData.name

        };
        const appendedData = new FormData();
        
        for (const key in companyData) {
            if(companyData.hasOwnProperty(key)){
                const value = companyData[key];

                if(value === undefined || value === null || value === '') continue;
                
                if (value instanceof File) {
                    appendedData.append(key, value, value.name);
                }
                else {
                    appendedData.append(key, value);
                }
            }
        }
        await handleSubmit(companyData);
    }

    return (
        <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-10 max-w-7xl mx-auto my-12 border border-gray-100">    
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="md:flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-0">
                    Add Job Details
                </h1>
            </div>
            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {InputList.map((input, index) => (
                        <div key={index} className={input.colSpan === 2 ? 'md:col-span-2' : ''}>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                {input.label}{input.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            
                            {input.type === "textarea" ? (
                                <textarea
                                    name={input.name}
                                    value={formData[input.name]}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-600 focus:border-green-600 sm:text-base transition duration-150"
                                    placeholder={input.placeholder}
                                    required={input.required}
                                    rows={3}
                                ></textarea>
                            ) : input.type === "select" ? (
                                <select
                                    name={input.name}
                                    value={formData[input.name] || (input.options.find(opt => opt.default) || {}).value || ''}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-600 focus:border-green-600 sm:text-base transition duration-150"
                                    required={input.required}
                                >
                                    <option value="" disabled>{input.placeholder}</option>
                                    {input.options.map((option, idx) => (
                                        <option key={idx} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            ) : (<input
                                    type={input.type}
                                    name={input.name}
                                    onChange={handleFormChange}
                                    {...(input.type !== 'file' &&{value: formData[input.name] || ''})}
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-green-600 focus:border-green-600 sm:text-base transition duration-150"
                                    placeholder={input.placeholder}
                                    required={input.required}
                                />
                            )}
                        </div>
                    ))}
                    <div className="md:col-span-2 flex justify-end mt-2">
                        <button className="flex items-center px-12 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-md transform hover:scale-[1.02] duration-200"
                        type="submit"
                        >
                            Post Job
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default JobPosting;