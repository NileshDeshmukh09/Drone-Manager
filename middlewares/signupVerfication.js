/**
 *  custom middleware for verifying the request body
 */

const User = require("../models/user.model");

const validateRequest = async (req,res, next) =>{

    //Validate if username provided
    const username = req.body.username ;
    if(!username ){
       console.log(res);
        return res.status(400).send(
            "username is not provided"
        )
    }

   // Check if the username is already taken
   const existingUser = await User.findOne({ username });
   if (existingUser) {
     return res.status(409).json({ message: 'Username already exists' });
   }


   /** validate the "password" if it Exists */  
   if( !req.body.password ){
       return res.status(400).send("Password is not provided")
   }
   
   /** validate the Password */

//    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

//    // message : "Password must have at least 1 upper case, 1 lower case, 1 digit, 1 special characters, and should be 8 characters in length."
//    if( !passwordPattern.test( req.body.password )){
//        return res.status(400).send( `Password must have at least - 1 upper case, 1 lower case,  1 digit, 1 special characters,  and should be 8 characters in length.`)
//    }
   
    next(); // give the controll to the controller
}

module.exports = {
    validateRequest
};