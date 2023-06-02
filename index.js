const express =require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();


app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Setup the mongodb connection 
 */
console.log("URL : ",process.env.DB_URL);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });


const homeRoutes = require('./routes/home.routes');
const authRoutes = require('./routes/auth.routes');
const siteRoutes = require('./routes/site.routes');
const droneRoutes = require('./routes/drone.routes');

app.use(  homeRoutes );
app.use( '/droneManager/api/v1' , authRoutes );
app.use( '/droneManager/api/v1' , siteRoutes );
app.use( '/droneManager/api/v1' , droneRoutes );


app.listen( process.env.PORT, () => {
    console.log(`Drone-Manager-Server has started on the port http://localhost:${ process.env.PORT }` );
})