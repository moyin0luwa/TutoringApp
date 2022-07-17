// Here we create our Schemas. Schemas model one's database
const { Schema, model } = require("mongoose");

// Creating User Schemas
const UserSchema = new Schema(
	{
		// Defining Properties for the Application User
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
		},
		userRole: {
			type: String,
			enum: ["admin", "tutor", "student", "not assigned"],
			default: "not assigned",
		},
		isTutor: {
			type: Boolean,
			default: 0, //0 for false
		},
		isAdmin: {
			type: Boolean,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = model('User', UserSchema)
