const trainerDao = require('../dao/trainerDao');
const trainerController = {
    login:async(request,response)=>{
        const {email,password} = request.body;
        if(!email || !password){
            return response.status(400).json({
                message:'Email and password are required'
            });
        }

        const trainer = await trainerDao.findByEmail(email);

        if(trainer && trainer.password==password){
            return response.status(200).json({
                message: "trainer authenticated",
                trainer: trainer
            });
        }
        else{
            return response.status(400).json({
                message:"Invalid email or password"
            });
        }
    },
    register:async(request,response)=>{
        const{name,email,password} = request.body;
        if(!name||!password||!email){
            return response.status(400).json({
                message: 'Name,Email,Password are required'
            });
        }

        const trainer = await trainerDao.findByEmail(email);

        if(trainer){
            return response.status(400).json({
                message:`trainer already exist with email: ${email}`
            })
        }

        const registeredtrainer = await trainerDao.create(email,name,password);

        return response.status(200).json({
            message: 'trainer registered',
            trainer:{ id:registeredtrainer._id}
        });
    },
    show:async(request,response)=>{
        const trainers = await trainerDao.show();
        return response.status(200).json({
            message: 'all registered trainers are listed',
            trainers: trainers
        });
    }
}
module.exports = trainerController;