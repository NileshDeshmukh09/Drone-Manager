const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/** Registration Controller  for the User  */

exports.signup = async ( req, res ) => {

    const UserDetailsStoredInDB = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
    }

     /**
     * Create the New User and Added to the database
     */
      try {
        const createdUser = await User.create(UserDetailsStoredInDB);

         /**
         *  response
         */
          const ResponseOfNewUser = {
            userID : createdUser._id,
            username: createdUser.username,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        }

        res.status(201).send({
            status : 201,
            message: `${createdUser.username} , Signup Successully !`,
            user: ResponseOfNewUser
        });
    } catch (err) {

        console.log( err.message );
        res.status(500).send({
            message: "Internal Server Error ,when Insert User !"
        })
    }

}


/**
 * signin Controller
 */
exports.signin = async (req, res) => {

    try{

        const { username, password } = req.body;

        // Validate inputs
        if (!username ) {
          return res.status(400).json({ message: 'Please provide a username ;' });
        }

        if (!password ) {
          return res.status(400).json({ message: 'Please provide a Password ;' });
        }

        // Check if the user exists
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username ' });
        }

         //User is exists , check for the valid password
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send("Invalid Password")
        }

        //** Successfull login */
        //I need to generate access token now
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: '2h'
        });


        res.status(200).send({
            status : 200,
            message: `${user.username} login Successfully !`,
            user: {
                userID : user._id,
                username: user.username,
                accessToken: token
            }
        })


    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }



    

};