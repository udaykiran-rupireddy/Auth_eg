const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    college: {type:String, required:true},
    subject: {type:String,required:true},
    time:    {type:Date,required:true},
    trainer_id: {type: String, required:true}
});

module.exports = mongoose.model('Work',workSchema);