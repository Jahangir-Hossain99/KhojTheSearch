import React, { useState, useCallback } from 'react';
import EditableList from '../components/EditableList'; 
// Assuming EditableList handles the complex array fields

const EditForm = ({ profileData, onSave, onCancel }) => {
    // Local state to manage form inputs, initialized with the current profile data
    const [formData, setFormData] = useState(profileData);

    // Generic handler for input changes (used by simple fields)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for the Save button
    const handleSave = () => {
        // Pass the updated data back to the parent component
        onSave(formData);
    };

    // Handler for the Cancel button
    const handleCancel = () => {
        // Parent component handles switching back to view mode
        onCancel();
    };

     const handleSkillsChange = useCallback((e) => {
        const newSkillString = e.target.value;
        const newSkillsArray = newSkillString
            .split(',')        
            .map(s => s.trim()) 
            .filter(s => s);    

        // NOTE: handleArrayUpdate is a stable function reference if defined outside 
        //       EditForm or memoized itself. Assuming it's defined inside EditForm,
        //       we must include 'handleArrayUpdate' in the dependency array if it changes.
        //       Since handleArrayUpdate uses 'setFormData', we'll rely on React's 
        //       guarantee that setState functions are stable.
        
        // We only depend on the state setter 'handleArrayUpdate' (which relies on 'setFormData')
        handleArrayUpdate('skills', newSkillsArray);
    }, [handleArrayUpdate]);

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

    // --- TEMPLATES FOR NEW ARRAY ITEMS ---
    const newExperienceTemplate = { title: '', company: '', years: '', description: '' };
    const newEducationTemplate = { degree: '', institution: '', years: '' };

    // --- FIELD DEFINITIONS FOR EDITABLE LISTS ---
    const experienceFields = [
        { name: 'title', label: 'Job Title' },
        { name: 'company', label: 'Company' },
        { name: 'years', label: 'Duration' },
        { name: 'description', label: 'Description', type: 'textarea' }
    ];

    const educationFields = [
        { name: 'degree', label: 'Degree/Certificate' },
        { name: 'institution', label: 'Institution' },
        { name: 'years', label: 'Years' }
    ];

    // --- Input Field Helper Component for clean UI ---
    // FIX: Must accept and use the 'onChange' prop to allow custom handlers.
    const InputField = ({ label, name, value, type = "text", isTextArea = false, onChange }) => (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
            {isTextArea ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange} // CORRECT: Uses the prop
                    rows="4"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                />
            ) : (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange} // CORRECT: Uses the prop
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                />
            )}
        </div>
    );
    // --------------------------------------------------

    return (
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-6xl mx-auto">

            {/* SAVE/CANCEL Buttons */}
            <div className="flex justify-end mb-6 space-x-3">
                <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
                >
                    Save Changes
                </button>
            </div>

            {/* Profile Header Fields */}
            <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
                {/* ... Avatar Code (omitted for brevity) ... */}
                <div className="text-center md:text-left mt-2 w-full">
                    {/* FIX: Must pass onChange={handleChange} for all simple fields */}
                    <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                    <InputField label="Title" name="title" value={formData.title} onChange={handleChange} />
                    <InputField label="Open To" name="openTo" value={formData.openTo} isTextArea={true} onChange={handleChange} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* About & Contact Section - Now with Input Fields */}
                <div className="md:col-span-1 bg-white rounded-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">About & Contact</h2>

                    {/* FIX: Must pass onChange={handleChange} for all simple fields */}
                    <InputField label="About Me" name="about" value={formData.about} isTextArea={true} onChange={handleChange} />

                    <div className="text-base text-gray-700 space-y-3">
                        {/* FIX: Must pass onChange={handleChange} for all simple fields */}
                        <InputField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} />
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

                    {/* 3. Simple Skills Array (uses custom array update logic) */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-purple-300">Skills (Comma-Separated)</h2>
                        <InputField
                            label="Skills"
                            name="skills"
                            // Defensive check for rendering array:
                            value={Array.isArray(formData.skills) ? formData.skills.join(', ') : ''}
                            // Custom onChange for conversion:
                            onChange={handleSkillsChange}
                            isTextArea={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditForm;