const express = require("express");
const { json } = require("express");
const app = express();
const connectDB = require('./db')
const PORT = process.env.PORT || 3000;
// const connect = require("./config/database");
// const todoRoute = require("./router/todoRoutes");

// connect() 
connectDB();

app.use(json());
// app.use("/todolist", todoRoute);

app.get("/", (req, res) => {
	res.send("Mongo CRUD running");
});
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));