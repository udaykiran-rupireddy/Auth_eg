const express = require('express');
const app = express();
app.use(express.json());
let users =[];
app.post('/register',(request,response)=>{
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

    const user = users.find(u=>u.email === email);
    if(user){
        return response.status(400).json({
            message:'User alreadyexist with email: ${email}'
        })
    }

    const newUser = {
        id:users.length+1,
        name:name,
        email:email,
        password:password        
    };

    users.push(newUser);

    return response.status(200).json({
        message: 'User registered',
        user:{ id:newUser.id}
    });

});

/**
 * Create a POST api with path/login which takes in email and password from 
 * body and checks if user with same email and password exist in the users 
 * array. If yes return 200 response , otherwise 400 response.
 */

app.post('/login',(request,response)=>{
    const {email,password} = request.body;
    if(!email || !password){
        return response.status(400).json({
            message:'Email and password are required'
        });
    }
    const user = users.find(u=>u.email === email && u.password === password);
    if(user){
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
});

app.listen(5001,()=>{
    console.log("Server is running on port 5001");
});