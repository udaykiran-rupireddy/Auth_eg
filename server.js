require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');

console.log(process.env.MONGO_DB_CONNECTION_URL);
mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)
.then(()=>console.log('MongoDB connected'))
.catch((error)=>console.log('Connection failed with error: ',error));

app.use(express.json()); //Middleware

app.use('/auth',authRoutes); // /auth/login & /auth/register

app.listen(5001,()=>{
    console.log("Server is running on port 5001");
});