import React, { useState } from 'react';
import toast from 'react-hot-toast';

const InputList = [
    { label: "Company Name", name: "companyName", type: "text", placeholder: "Enter Company full name", required: false },
    { label: "Company Email ", name: "companyEmail", type: "email", placeholder: "Enter your email address", required: false },
    { label: "Password", name: "password", type: "password", placeholder: "Create a password (min 8 chars)", required: false },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm your password", required: false },
    { label: "Company Address", name: "companyAddress", type: "text", placeholder: "Enter your address", required: false },
    { label: "Upload A Logo", name: "logo", type: "file", placeholder: "", required: false },
    { label: "Website", name: "website", type: "url", placeholder: "Enter company website (Optional)", required: false, colSpan: 2 },
    { label: "About Company", name: "companyAbout", type: "textarea", placeholder: "Tell us a bit about yourself", required: false, colSpan: 2 },
];

const EmployeeRegistration = ({handleCancel,handleSubmit}) => {   
    
    const [formData,setFormData] = useState({});


    const handleFormChange = async (e) => {
        const { name, value, type,files } = e.target;
        const fieldValue = type === 'file' ? files[0] : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: fieldValue,
        }));
    }

    const onSubmit =  async (e) => {
        e.preventDefault();
        const companyData = {
            ...formData,
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
        await handleSubmit(companyData);
        
    }

    return (
        <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-10 max-w-7xl mx-auto my-12 border border-gray-100">    
        <form className="space-y-6" onSubmit={onSubmit}>
            <div className="md:flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-0">
                    Register Your Company
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
                        Register Company
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
                </div>
            </form>
        </div>
    );
};

export default EmployeeRegistration;