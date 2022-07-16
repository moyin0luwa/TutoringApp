const express = require("express")
const { json } = require("express")
const app = express()

// importing the dotenv pakage to be able to access our .env variables
require("dotenv").config()
const PORT = process.env.PORT || 3000

// connecting to the database
const connectDB = require("./config/db")
connectDB()

// initializing middleware
app.use(json())

// Configuring a get request
app.get("/", (req, res) => {
	res.json({ Message: "Tutoring App running" })
})

// listening to a configured PORT
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`))
