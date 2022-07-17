// In this file we write our business logic, whatever function the app does, there is a controller to control or effect that function
// First we bring in the models
const userModels = require("../models/userModels.js")

// Bringing in express validator to validate the request coming in from the client
const { validationResult } = require("express-validator")

// Exp
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { message } = require("prompt")

require('dotenv').config()
const {SECRET} = process.env


// Controller to obatin logged in user
// @route GET /api/auth
// @desc this function auntheticates the user
// @access Public i.e every user(student, tutor, admin) has access to this
exports.getLoggedinUser = async(req, res) => {
    try {
        // Get User from db
        const user = await userModels.findById(req.user.id).select('password')
        res.status(200).json({
            success: true,
            message: 'User gotten successfully',
            user
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
}


// Creating the controller for the login function
// @route POST /api/auth/login
// @desc this function auntheticates the user
// @access Public i.e every user(student, tutor, admin) has access to this
exports.userLogin = async (req, res) => {
	//  First we check for errors from the routes
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	const { email, password } = req.body
	try {
		// Initiallize User
		let user = await userModels.findOne({ email }) // from the userModels i.e the db, we find the user requested by the parameter
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid Credentials",
			})
		}
		// if user is found we then check for the password
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({
				success: false,
				message: "Wrong Password input",
			})
		}
        // if password matches, we send token, we also send Payload and signed token
        const payload = {
            user : {
                id: user.id,
            }
        }
        // Then we sign it
        jwt.sign(
            payload,
            SECRET,
            {
                expiresIn: 86400
            },
            (err, token) => {
                if(err){
                    throw err
                } 
                res.status(200).json({
                    success: true,
                    message: 'User login successful',
                    user: {
                        firstname: user.firstName,
                        lastname: user.lastName,
                        email: user.email,
                        userRole: user.userRole,
                        isTutor: user.isTutor,
                        isAdmin: user.isAdmin
                    },
                    token
                })
            }
        )

	} catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
}
