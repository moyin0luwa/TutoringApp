// In this file we create and Conigure our Database connection
const mongoose = require("mongoose")
require("dotenv").config()

url = process.env.MONGO_DB_URL

// creating and configuring our MongoDB connection
const connectDB = async () => {
	try {
		mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log("Connected to Mongo DB Successfully")
		// seed data
	} catch (err) {
		console.log(err.message)
		
		// Exiting the connecton with a failure
		process.exit(1)
	}
}

// Exporting the connectDB function
module.exports = connectDB
