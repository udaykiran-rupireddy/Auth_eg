const User = require("../models/users");
const userDao = {
    create: async (email,name,password)=>{
        const newUser = new User({
            email: email,
            name: name,
            password: password
        });
        return await newUser.save();
    },
    findByEmail: async (email) =>{
        const user = await User.findOne({email});
        return user;
    }
}
module.exports = userDao;