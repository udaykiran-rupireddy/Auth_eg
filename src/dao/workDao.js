const Work = require('../models/work');
const Trainer = require('../models/trainers');
const workDao = {
    creatework: async (college,subject,time,trainer_id) =>{
        const newwork = new Work({
            college:college,
            subject:subject,
            time:time,
            trainer_id:trainer_id
        });
        return await newwork.save();
    },
    deletework: async(time)=>{
        return await Work.deleteMany({ time: time });
    },
    show: async (trainer_id)=>{
        //return await Work.find({}, { _id: 0 }).populate("name email");
        const works = await Work.find({ trainer_id }, { _id: 0 });
        const trainer = await Trainer.findById(trainer_id, { name: 1, email: 1, _id: 0 });
        return { trainer, works };
    },
    // update: async()=>{

    // }
}
module.exports = workDao;