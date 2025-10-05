import React, { useState,useCallback } from 'react';
import InputField from '../components/UI/InputField';
import EditableList from '../components/EditableList';
import { useNavigate } from 'react-router-dom';

// Initial empty data structure for registration

const initialRegistrationData = {
  // Simple Fields
  name: '',
  title: '',
  password: '',
  about: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',

  // Array Fields
  experience: [], // Starts empty
  education: [], // Starts empty
  skills: [],    // Starts empty

  // Helper State for Skills Input
  skillInput: '', // To manage the comma-separated string for skills
};

// Main application component
const Register = ({onSubmit , onCancel}) => {

  // Initialize with the empty data structure
  const [formData, setFormData] = useState(initialRegistrationData);

  // Initialize the skillInput helper state
  const [skillInput, setSkillInput] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
  };

  const handleSubmit = () => {
        // 1. Convert the raw skillInput string to the final array format
        const finalSkillsArray = skillInput
            .split(',')        // Split by comma
            .map(s => s.trim()) // Remove extra spaces
            .filter(s => s);    // Remove any empty strings

        // 2. Create the final data object, overwriting the old skills array
        const finalFormData = {
            ...formData,
            skills: finalSkillsArray, 
    };
    // 3. Pass the fully updated data back to the parent component
    onSubmit(finalFormData);
  };

  // Handler for the Cancel button
    const handleCancel = () => {
        // Parent component handles switching back to view mode
        // onCancel();
        navigate(-1); // Navigate back to the previous page
    };

  // Handler for updating the entire array (used by EditableList and Skills)
    const handleArrayUpdate = (fieldName, updatedArray) => {
        setFormData(prevData => ({
            ...prevData,
            [fieldName]: updatedArray,
        }));
    };

  // Handler for removing an item from the array
    const handleRemoveItem = (fieldName, id) => {
        const updatedArray = formData[fieldName].filter(item => item.id !== id);
        handleArrayUpdate(fieldName, updatedArray);
    };

  // Handler for adding a new item to the array
    const handleAddItem = (fieldName, newItemTemplate) => {
        const newItem = {
            id: Date.now(), // Use a unique ID
            ...newItemTemplate
        };
        handleArrayUpdate(fieldName, [...formData[fieldName], newItem]);
    };

    const handleSkillsChange = useCallback((e) => {
            // Only update the local string state. Allows commas and spaces to be typed.
            setSkillInput(e.target.value);
        }, []);

    // --- TEMPLATES FOR NEW ARRAY ITEMS ---
    const newExperienceTemplate = { title: '', company: '', years: '' };
    const newEducationTemplate = { degree: '', institution: '', years: '' };

    // --- FIELD DEFINITIONS FOR EDITABLE LISTS ---
    const experienceFields = [
        { name: 'title', label: 'Job Title' },
        { name: 'company', label: 'Company' },
        { name: 'years', label: 'Duration' },
    ];

    const educationFields = [
        { name: 'degree', label: 'Degree/Certificate' },
        { name: 'institution', label: 'Institution' },
        { name: 'years', label: 'Years' }
    ];
  
  return (
        <div className="bg-white mt-18 shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">
          
          <div className="inline-block md:flex justify-between items-center">
            <h1 className="text-4xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-6">Register Your Profile</h1>
            {/* SUBMIT/CANCEL Buttons */}
            <div className="flex  mb-2 space-x-3">
                <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit} // Use handleSubmit here
                    className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
                >
                    Register Profile
                </button>
            </div>
          </div>
            
            

            {/* Profile Header Fields */}
            <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
                <div className="text-center md:text-left mt-2 w-full">
                    <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                    <InputField label="Title" name="title" value={formData.title} onChange={handleChange} />
                    <div className='columns-2' >
                    <InputField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} />
                    <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* About & Contact Section */}
                <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">About & Contact</h2>
                    
                    <InputField label="About Me" name="about" value={formData.about} isTextArea={true} onChange={handleChange} />

                    <div className="text-base text-gray-700 space-y-3">
                        <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
                        <InputField label="LinkedIn URL (e.g., linkedin.com/in/janedoe)" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                    </div>
                </div>

                <div className="md:col-span-2 space-y-8">

                    {/* 1. Editable Work Experience */}
                    <EditableList
                        title="Work Experiences"
                        items={formData.experience}
                        fields={experienceFields}
                        onUpdate={(arr) => handleArrayUpdate('experience', arr)}
                        onRemove={(id) => handleRemoveItem('experience', id)}
                        onAdd={() => handleAddItem('experience', newExperienceTemplate)}
                    />

                    {/* 2. Editable Education */}
                    <EditableList
                        title="Educations"
                        items={formData.education}
                        fields={educationFields}
                        onUpdate={(arr) => handleArrayUpdate('education', arr)}
                        onRemove={(id) => handleRemoveItem('education', id)}
                        onAdd={() => handleAddItem('education', newEducationTemplate)}
                    />

                    {/* 3. Skills Array */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">Skills (Comma-Separated)</h2>
                        <InputField
                            label="Skills"
                            name="skills"
                            value={skillInput} // Uses the mutable string state
                            onChange={handleSkillsChange} // Uses the stable handler
                            isTextArea={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
