import React, { useState,useCallback } from 'react';
import InputFields from '../UI/InputFields';
import toast from 'react-hot-toast';

const InputList = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name", required: false },
    { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email address", required: false },
    { label: "Password", name: "password", type: "password", placeholder: "Create a password (min 8 chars)", required: false },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm your password", required: false },
    { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter your phone number", required: false },
    { label: "Address", name: "address", type: "text", placeholder: "Enter your address", required: false },
    { label: "Upload A Picture", name: "avatar", type: "file", placeholder: "", required: false },
    { label: "Upload Resume", name: "resume", type: "file", placeholder: "", required: false },
    { label: "LinkedIn Profile", name: "linkedin", type: "url", placeholder: "Enter your LinkedIn profile URL (Optional)", required: false, colSpan: 2 },
    { label: "Short Bio", name: "aboutme", type: "textarea", placeholder: "Tell us a bit about yourself", required: false, colSpan: 2 },
    { label: "Skills", name: "skills", type: "textarea", placeholder: `"," Comma Separated`, required: false, colSpan: 2 },
];

const experienceFields = [
    { name: 'title', label: 'Job Title' },
    { name: 'company', label: 'Company' },
    { name: 'years', label: 'Duration' },
  ];

const educationFields = [
    { name: 'degree', label: 'Degree/Certificate' },
    { name: 'institution', label: 'Institution' },
    { name: 'years', label: 'Years' }
  ]


const UserRegister = ({handleCancel,handleSubmit}) => {   
    
    const [formData,setFormData] = useState({});

    const initialEducation = educationFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});

    const initialExperience = experienceFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {});

    const [experienceData,setExperienceData] = useState({});
    const [educationData,setEducationData] = useState({});

    const handleFormChange = async (e) => {
        const { name, value, type,files } = e.target;
        const fieldValue = type === 'file' ? files[0] : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: fieldValue,
        }));
    }

    const education = useCallback((listData) => {
        setEducationData(listData);
        console.log("Education Data:", listData);
    }, []);
    const experience = useCallback((listData) => {
        setExperienceData(listData);
        console.log("Experience Data:", listData);
    }, []);

    const onSubmit =  async (e) => {
        e.preventDefault();
        const completeData = {
            ...formData,
            education: educationData,
            experience: experienceData
        };
        const appendedData = new FormData();
        
        for (const key in completeData) {
            if(completeData.hasOwnProperty(key)){
                const value = completeData[key];

                if(value === undefined || value === null || value === '') continue;
                
                if (key === 'education' || key === 'experience') {
                    appendedData.append(key, JSON.stringify(value));
                }
                else if (value instanceof File) {
                    appendedData.append(key, value, value.name);
                }
                else {
                    appendedData.append(key, value);
                }
            }
        }

        console.log(typeof(appendedData));
        console.log("--- FormData Contents ---");
    for (const [key, value] of appendedData.entries()) {
        if (value instanceof File) {
             console.log(`${key}: File: ${value.name} (${value.type})`);
        } else {
             // For text/json fields
             console.log(`${key}: ${value}`);
        }
    }

    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return; 
    }

    console.log("-------------------------");
        if(handleSubmit){ await handleSubmit(appendedData);}
        
    }

    return (
        <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-10 max-w-7xl mx-auto my-12 border border-gray-100">    
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="md:flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-0">
                    Register Your Profile
                </h1>
                <div className="flex space-x-3">
                    <button className="flex items-center px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors shadow-sm"
                    type="button"
                    onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button className="flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-md transform hover:scale-[1.02] duration-200"
                    type="submit"
                    >
                        Register Profile
                    </button>
                </div>
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
                            ) : (
                                <input
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
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-6 md:mt-0">Education</h2>
                        <InputFields 
                            label={educationFields}
                            data={initialEducation}
                            updatedData={education}
                        />                        
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-6 md:mt-0">Experience</h2>
                        <InputFields 
                            label={experienceFields}
                            data={initialExperience}
                            updatedData={experience}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserRegister;