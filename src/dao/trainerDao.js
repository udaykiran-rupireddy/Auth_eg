const Trainer = require('../models/trainers');
const trainerDao = {
    create: async (email,name,password) => {
        const newTrainer = new Trainer({
            email:email,
            name: name,
            password: password
        });
        return await newTrainer.save();
    },

    show: async ()=>{
        return await Trainer.find({}, { name: 1, _id: 0 });
    },
        
    findByEmail: async (email)=>{
        const trainer = await Trainer.findOne({email});
        return trainer;
    }
}
module.exports = trainerDao;