import React, { useState,useCallback } from 'react';
import InputFields from '../components/UI/InputFields';
import toast from 'react-hot-toast';
import {useAuth } from '../context/AuthContext';
import axios from 'axios';


const InputList = [
    { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name", required: false },
    { label: "Email Address", name: "email", type: "email", placeholder: "Enter your email address", required: false },
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


const UpdatedUser = ({onCancel}) => {   

    const {userData, updatedUserData } = useAuth();

    const createBlankEntry = (fields) => {
        return fields.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {});
    };

    const existingEducation = userData?.education && Array.isArray(userData.education) && userData.education.length > 0 ? userData.education : [createBlankEntry(educationFields)];
    const existingExperience = userData?.experience && Array.isArray(userData.experience) && userData.experience.length > 0 ? userData.experience : [createBlankEntry(experienceFields)];
    
    const [formData,setFormData] = useState(userData || {});

    const [experienceData,setExperienceData] = useState(existingExperience);
    const [educationData,setEducationData] = useState(existingEducation);

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
    }, []);
    const experience = useCallback((listData) => {
        setExperienceData(listData);
    }, []);

    const handleSubmit = async (appendedData) => {
        try {
         const response =  await axios.put(`http://localhost:5000/users/update`, appendedData,
            {   headers: { 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('authToken')}` }
             }
          );
          
          console.log("Profile update response:", response.data);
            toast.success(`${response.data.message}`,{ duration: 2000 });
            updatedUserData(response.data.user);
        } catch (error) {
            const message = error.response?.data?.message || "Profile update failed. Please try again.";
            toast.error(message);
        }
        onCancel();
    };

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

    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return; 
    }
     await handleSubmit(appendedData);
}


    return (
        <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-10 max-w-7xl mx-auto my-12 border border-gray-100">    
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="md:flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-0">
                    Update Your Profile
                </h1>
                <div className="flex space-x-3">
                    <button className="flex items-center px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-200 transition-colors shadow-sm"
                    type="button"
                    onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button className="flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-md transform hover:scale-[1.02] duration-200"
                    type="submit"
                    >
                        Update Profile
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
                            data={educationData}
                            updatedData={education}
                        />                        
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-6 md:mt-0">Experience</h2>
                        <InputFields 
                            label={experienceFields}
                            data={experienceData}
                            updatedData={experience}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdatedUser;