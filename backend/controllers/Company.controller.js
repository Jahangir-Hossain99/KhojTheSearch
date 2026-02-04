const Company = require('../models/Company.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const createCompany = async (req, res) => {
    const logo = req.files.logo ? req.files.logo[0] : null;
    const logoUrl = logo ? { URL: `/public/companyLogo/${logo.filename}`, fileName: logo.filename } : null;
    const { companyEmail, password, companyName, companyAddress, website, companyAbout } = req.body;

    try {
        const existingCompany = await Company.findOne({ email:companyEmail });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company email already in use' });
        }
        const newCompany = new Company({
            email: companyEmail,
            password,
            name: companyName,
            address: companyAddress,
            website,
            about: companyAbout,
            logoUrl: logoUrl
        });
        console.log('New Company Data:', newCompany);
        await newCompany.save();
        return res.status(201).json({ message: 'Company registered successfully', company: newCompany });
      } catch (error) {
        console.error('Error in createCompany:', error);
        return res.status(500).json({ message: 'Server error' });
      }
}

const updateCompanyProfile = async (req, res) => {
    const companyId = req.user.id;
    const logo = req.files.logo ? req.files.logo[0] : null;
    const logoUrl = logo ? { URL: `/public/companyLogo/${logo.filename}`, fileName: logo.filename } : null;
    const { email, name, address, website, about, password } = req.body;

    try {
        const updateData = {
            email,
            name,
            address,
            website,
            about,
        };
        if (logoUrl) {
            updateData.logoUrl = logoUrl;
        }
        if (password) {
            updateData.password = password;
        }
        const updatedCompany = await Company.findByIdAndUpdate(companyId, updateData, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        return res.status(200).json({ message: 'Company profile updated successfully', company: updatedCompany });
      } catch (error) {
        console.error('Error in updateCompanyProfile:', error);
        return res.status(500).json({ message: 'Server error' });
      }
}

const deleteCompany = async (req, res) => {
    const companyId = req.params.companyId;
    try {
        const deletedCompany = await Company.findByIdAndDelete(companyId);
        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        return res.status(200).json({ message: 'Company deleted successfully' });
      } catch (error) {
        console.error('Error in deleteCompany:', error);
        return res.status(500).json({ message: 'Server error' });
      }
}

const getSpecificCompanyDetails = async (req, res) =>{
    const companyId = req.params.companyId
    try {
        const companyDetails = await Company.findById(companyId)
        if(!companyDetails){
            return res.status(404).json({message: "Unable to find the company"})
        }
        return res.status(200).json({companyDetails })
    } catch (error) {
        console.error("Error in fetching company details")
        return res.status(500).json({message:"Error while fetching company Details"})
    }
}

module.exports = {createCompany, updateCompanyProfile, deleteCompany, getSpecificCompanyDetails};