const express = require('express');
const app = express();
const authRoutes = require('./src/routes/authRoutes');
app.use(express.json());

app.use('/auth',authRoutes);

app.listen(5001,()=>{
    console.log("Server is running on port 5001");
});