const workDao = require('../dao/workDao');
const Trainer = require('../models/trainers');
const workController ={
    work:async(request,response)=>{
        const{college,subject,time,trainer_id} = request.body;
        if(!college||!subject||!time||!trainer_id){
            return response.status(400).json({
                message: 'college,subject,time,trainer_id are required'
            });
        }
        
        if(await Trainer.findById(trainer_id)){
            const registeredwork = await workDao.creatework(college,subject,time,trainer_id);
            return response.status(200).json({
                message: "work data registered",
                work:{id:registeredwork._id}
            });
        }
        else{
            return response.status(400).json({
                message: 'trainer_id is not valid '
            });
        }
    },
    delete:async(request,response)=>{
        const{time} = request.body;
        if(!time){
            return response.status(400).json({
                message: 'time is required'
            });
        }
        await workDao.deletework(time);
        return response.status(200).json({ message: 'Work deleted successfully' });
    },
    print:async(request,response)=>{
        const { trainer_id } = request.query;
        const work = await workDao.show(trainer_id);
        return response.status(200).json({
            message: 'all registered work of trainer is listed',
            work:work
        });
    
    },
    // update:async(request,response)=>{

    // }
}
module.exports =  workController;