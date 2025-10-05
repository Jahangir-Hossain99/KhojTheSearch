import React, { useState } from 'react';
import ProfileView from './ProfileView'; // Assuming you saved the view component here
import EditForm from './EditForm';     // Assuming you saved the form component here

// Mock data structure
const initialProfileData = {
  name: 'Jane Doe',
  title: 'Senior Software Engineer',
  password: '123456',
  about: 'A passionate and results-driven senior software engineer...',
  email: 'jane.doe@email.com',
  phone: '(123) 456-7890',
  address: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/janedoe',
  experience: [
    { id: 1, title: "Lead Software Engineer", company: "Tech Innovators Inc.", years: "2020 - Present", description: "Led a team of 5 engineers..." },
    { id: 2, title: "Software Engineer", company: "Web Solutions Co.", years: "2017 - 2020", description: "Contributed to the development..." }
  ],
  skills: ["JavaScript", "React", "Node.js", "Tailwind CSS"], // Simplified array of strings
  education: [
    { id: 1, degree: "Master of Science in Computer Science", institution: "University of Technology", years: "2015 - 2017" },
    { id: 2, degree: "Bachelor of Engineering in Software Engineering", institution: "State University", years: "2011 - 2015" }
  ]
};

const Profile = () => {
  // 1. State to hold the official profile data
  const [profile, setProfile] = useState(initialProfileData);
  
  // 2. State to control the view mode (View/Edit)
  const [isEditing, setIsEditing] = useState(false);

   // Function to switch to edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save the data sent back from the EditForm
  const handleSave = (newProfileData) => {
    // ⚠️ This is the crucial step: update the main profile state
    setProfile(newProfileData);
    
    // Switch back to the read-only view
    setIsEditing(false); 
    
    // In a real app, you would send newProfileData to a server API here.
    console.log("Profile updated and saved to state.");
  };

   // Function to cancel editing and switch back to view mode
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20">
      {/* 3. Conditional Rendering: Show the form OR the view */}
      {isEditing ? (
        <EditForm 
          profileData={profile} // Pass current data to the form
          onSave={handleSave}    // How the form saves data
          onCancel={handleCancel} // How the form cancels
        />
      ) : (
        <ProfileView 
          profile={profile} // Pass current data to the view
          onEdit={handleEdit} // How the view switches to edit mode
        />
      )}
    </div>
  );
};

export default Profile;