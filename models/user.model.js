
/**
* Schema for the user Model will be provided Here
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique : true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    drones: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Drone',
    },


});

/* These will automatically generates the created and updated fields */
userSchema.set('timestamps' , true);



module.exports = mongoose.model("User", userSchema);


