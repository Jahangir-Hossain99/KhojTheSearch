const express = require("express");
const cookieParser = require('cookie-parser');
const router = express.Router();
const { createUser } = require("../controllers/User.controller");

router.use(cookieParser());

router.post('/register', createUser);