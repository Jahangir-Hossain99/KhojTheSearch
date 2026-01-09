import {useEffect, useState} from 'react';
import CompanyProfileView from './CompanyProfileView';
import CompanyEditForm from './CompanyEditForm';
import { useAuth } from "../../context/AuthContext";
import ConfirmationModal from '../../components/UI/ConfirmationModal';
import axios from 'axios';

const CompanyProfile = () => {

const { userData,logout } = useAuth(); // Data from Auth Context

const mapUserDataToProfile = (userData) => {
  if (!userData) return {};
  return {
    name: userData.name,
    about: userData.about,
    email: userData.email,
    address: userData.address,
    website: userData.website,
    skills: userData.skills,
    userData: userData
  };
} ; // Function to map userData to profile structure


  // 1. State to hold the official profile data
  const [profile, setProfile] = useState(mapUserDataToProfile(userData) );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  // 2. State to control the view mode (View/Edit)
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if(userData){
      setProfile(mapUserDataToProfile(userData));
    }
  }, [userData]);

   // Function to switch to edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

   // Function to cancel editing and switch back to view mode
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };
  const handleConfirmDelete = () => {
    let role = userData.role === 'employer' ? 'company' : 'users';
    // Logic to delete the profile goes here
    setShowDeleteConfirmation(false);
    axios.delete(`http://localhost:5000/${role}/${userData._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }).then(response => {
      console.log("Profile deleted:", response.data.message);
      // Optionally, you can log the user out or redirect them
    }
    ).catch(error => {
      console.error("Error deleting profile:", error);
    });
    setProfile(null);
    logout();
  };
  if(!profile){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
    {showDeleteConfirmation &&  <ConfirmationModal
      isOpen={showDeleteConfirmation}
      message="delete your profile? This action cannot be undone."
      confirm={handleConfirmDelete}
      cancel={() => setShowDeleteConfirmation(false)}
    />}
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20">
      {/* 3. Conditional Rendering: Show the form OR the view */}
      {isEditing ? (
        <CompanyEditForm 
          onCancel={handleCancel} // How the form cancels
        />
      ) : (
        <CompanyProfileView 
          profile={profile} // Pass current data to the view
          onEdit={handleEdit} // How the view switches to edit mode
          onDelete={handleDelete} // How the form deletes
        />
      )}
    </div>
    </>
  );
};

export default CompanyProfile;