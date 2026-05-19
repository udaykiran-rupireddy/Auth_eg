const mongoose = require('mongoose');
const trainerSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required:true,unique:true},
    password:{type:String, required:true}
});
const workSchema = new mongoose.Schema({
    college: {type:String, required:true},
    subject: {type:String,required:true},
    time:{type:Date,required:true}
});

const Trainer = mongoose.model('Trainer',trainerSchema);
const Work = mongoose.model('Work',workSchema);
module.exports={Trainer,Work};