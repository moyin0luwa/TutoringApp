// This checks to see if there's a token and a Header, 
// Tokens are encrypted details of a particular user sent when a user logs in with the correct details
// if the token is sent then the user is auntheticated
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {SECRET} = process.env

module.exports = (req, res, next) => {
    // Get token from the Header, As best practice, Token should be placed in the header not the body
    const token = req.header('x-auth-token')
    // Check if token is non-existent
    if(!token){
        return res.status(401).json({
            success: false,
            message: 'No token recieved, Unauthorized User!'
        })
    }
    try {
        //else if token exists we first decode the token
        const decoded = jwt.verify(token, SECRET)
        //Then we assign user to a request object
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
}