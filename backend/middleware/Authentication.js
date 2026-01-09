const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const user = require('../models/User.js');
const Company = require('../models/Company.js');
const bcrypt = require('bcrypt');

const authenticateToken = (req, res, next) => {
    if(!secretKey){
        return res.status(500).json({message:'JWT Secret Key not configured'});
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) return res.sendStatus(401);
   jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

const userloginAuthenticate = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ email }).select('+password');
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid email ' });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid  password' });
        }

        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, secretKey, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

        return res.status(200).json({ token, user: existingUser });
    } catch (error) {
        console.error('Error in loginAuthenticate:', error);
        return res.status(500).json({ message: 'Server error',});
    }
}

const companyLoginAuthenticate = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingCompany = await Company.findOne({ email }).select('+password');
        if (!existingCompany) {
            return res.status(400).json({ message: 'Invalid email ' });
        }
        const isPasswordValid = await bcrypt.compare(password, existingCompany.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid  password' });
        }
        const token = jwt.sign({ id: existingCompany._id, email: existingCompany.email }, secretKey, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
        return res.status(200).json({ token, company: existingCompany });
    } catch (error) {
        console.error('Error in companyLoginAuthenticate:', error);
        return res.status(500).json({ message: 'Server error', });
    }
}


module.exports = { authenticateToken, userloginAuthenticate, companyLoginAuthenticate };