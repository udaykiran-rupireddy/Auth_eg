const userDao = require('../dao/userDao');
const authController = {
    login: async(request,response) =>{
        const {email,password} = request.body;
        if(!email || !password){
            return response.status(400).json({
                message:'Email and password are required'
            });
        }
        //const user = users.find(u=>u.email === email && u.password === password);
        const user = await userDao.findByEmail(email);

        if(user && user.password==password){
            return response.status(200).json({
                message:"User authenticated",
                user:user
            });
        }
        else{
            return response.status(400).json({
                message:"Invalid email or password"
            });
        }
    },
    register: async(request,response) =>{
        const {name,email,password} = request.body;
        if(!name||!email||!password){
            return response.status(400).json({
                message: 'Name,Email,Password are required'
            });
        }

        /**
         * Implement logic to check if user with the same email already 
         * exists in the users object!
         */

        //const user = users.find(u=>u.email === email);
        const user = await userDao.findByEmail(email);

        if(user){
            return response.status(400).json({
                message:`User already exist with email: ${email}`
            })
        }

        //users.push(newUser);

        const registeredUser = await userDao.create(email,name,password);

        return response.status(200).json({
            message: 'User registered',
            user:{ id:registeredUser._id}
        });
    }
}

/** Without this line noone from outside this file
* will be able to call authController
*/
module.exports = authController;