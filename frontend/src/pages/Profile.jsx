import React, { useState } from 'react';
import ProfileView from './ProfileView'; // Assuming you saved the view component here
import EditForm from './EditForm';     // Assuming you saved the form component here

// Mock data structure
const initialProfileData = {
  name: 'Jane Doe',
  title: 'Senior Software Engineer',
  openTo: 'Open to new opportunities in the tech industry.',
  about: 'A passionate and results-driven senior software engineer...',
  email: 'jane.doe@email.com',
  phone: '(123) 456-7890',
  address: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/janedoe',
};

const Profile = () => {
  // 1. State to hold the official profile data
  const [profile, setProfile] = useState(initialProfileData);
  
  // 2. State to control the view mode (View/Edit)
  const [isEditing, setIsEditing] = useState(false);

  // Function to save the data sent back from the EditForm
  const handleSave = (newProfileData) => {
    // ⚠️ This is the crucial step: update the main profile state
    setProfile(newProfileData);
    
    // Switch back to the read-only view
    setIsEditing(false); 
    
    // In a real app, you would send newProfileData to a server API here.
    console.log("Profile updated and saved to state.");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20">
      {/* 3. Conditional Rendering: Show the form OR the view */}
      {isEditing ? (
        <EditForm 
          profileData={profile} // Pass current data to the form
          onSave={handleSave}    // How the form saves data
          onCancel={() => setIsEditing(false)} // How the form cancels
        />
      ) : (
        <ProfileView 
          profile={profile} // Pass current data to the view
          onEdit={() => setIsEditing(true)} // How the view switches to edit mode
        />
      )}
    </div>
  );
};

export default Profile;