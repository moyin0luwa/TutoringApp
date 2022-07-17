// In this file we define our routes fpr the App
const express = require("express")
const router = express.Router()
const { check } = require("express-validator")
const auth = require('../middleware/auth')

// Then we import the router controller
const userControllers = require("../controller/userControllers")

// Creating the routes
// Login user route(A post route)
router.post(
	"/api/auth/login",
	[
		check("email", "Please enter a valid email address").isEmail(),
		check("password", "Please enter the correct password").exists(),
	],
	userControllers.userLogin
)

// This is a private route, to access this a token has to be passed in the header indicating that the user is authenticated, which is what the auth is for
router.get('/api/auth', auth, userControllers.getLoggedinUser)


module.exports = router
