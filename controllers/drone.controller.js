const Drone = require('../models/drone.model');
const Site = require('../models/site.model');
const User = require('../models/user.model');

// Add a new drone
const addDrone = async (req, res) => {

  try {
    const { 
        droneType, 
        makeName, 
        name,  
        siteID 
    } = req.body;

    // Validate request body
    if (!droneType || !makeName || !name  || !siteID ) {
      return res.status(400).json({ error: 'Invalid request body' });
    }



    // Check if the associated site exists
    const site = await Site.findOne({ _id : siteID});

    if ( !site ) {
      return res.status(404).json({ error: 'Site not found' });
    }

      /** User ID of reported must be present in x-access-token */
      const user = await User.findOne({
       _id : req.userID
   });

   if ( !user ) {
    return res.status(404).json({ error: 'UnAuthorised API' });
  }

   createdBy =user.username;

   
    



    const newDrone = new Drone({
        droneType, 
        makeName, 
        name,  
        createdBy,
        siteID 
    });

    const savedDrone = await newDrone.save();

     /**
      * Update the User
    */
    user.drones.push(savedDrone._id);
    await user.save();



    res.status(200).json({
        success : true ,
        message : `Drone Added Successfully `,
        savedDrone
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Update a drone
const updateDrone = async (req, res) => {
  try {
    const { id } = req.params;
    const { droneType, makeName, name } = req.body;

   
    // Check if the drone exists
    const drone = await Drone.findById(id);

    if (!drone) {
      return res.status(404).json({ error: 'Drone not found' });
    }

     /** User ID of reported must be present in x-access-token */
     const user = await User.findOne({
      _id : req.userID
  });

  if ( !user ) {
    return res.status(404).json({ error: 'UnAuthorised API' });
  }

  if( user.username != drone.createdBy ){
    return res.status(403).send({
      message: "Only Owner of the Drone is allowed to Delete Drone"
    })
  }

    // Update the drone fields
    drone.droneType =  droneType != undefined ? droneType : drone.droneType ;
    drone.makeName = makeName != undefined ? makeName : drone.makeName ;
    drone.name = name != undefined ? name : drone.name ;
    drone.createdBy = drone.createdBy;
    drone.siteID = drone.siteID ;
    drone.createdAt = drone.createdAt ;
    drone.updatedAt = Date.now();

    const updatedDrone = await drone.save();

    res.status(200).json({
      success : true , 
      message : `${drone.name} , updated Successfully ! `,
      updatedDrone
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Get all drones
const getAllDrones = async (req, res) => {

  try {

    
    /** User ID of reported must be present in x-access-token */
    const user = await User.findOne({
      _id : req.userID
    });
    
    if ( !user ) {
      return res.status(404).json({ error: 'UnAuthorised API' });
    }

    const drones = await Drone.find({createdBy : user.username });

    res.status(200).json({
      success : true,
      message : `Drone Fetched !`,
      drones
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};



 // Delete a site
const deleteDrone =  async (req, res) => {

  try {
    const { id } = req.params;

    /** User ID of reported must be present in x-access-token */
    const user = await User.findOne({
      _id : req.userID
  });

  if ( !user ) {
    return res.status(404).json({ error: 'UnAuthorised API' });
  }


    const drone = await Drone.findOne({ _id : id});

    console.log(drone)

    if (!drone ) {
      return res.status(404).json({ error: 'Drone not found' });
    }


    if( user.username != drone.createdBy ){
      return res.status(403).send({
        message: "Only Owner of the Drone is allowed to Delete Drone"
      })
    }
    
    const deletedrone = await Drone.deleteOne({ _id : id});

    res.json({ 
      success : true,
      message: `${deletedrone.name}Drone deleted successfully`
    
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get one drone by ID
const getOneDrone = async (req, res) => {
  try {

    const drone = await Drone.findById(req.params.id);

    /** User ID of reported must be present in x-access-token */
    const user = await User.findOne({
      _id : req.userID
  });

  if ( !user ) {
    return res.status(404).json({ error: 'UnAuthorised API' });
  }


    if (!drone) {
      return res.status(404).json({ error: 'Drone not found' });
    }

     if( user.username != drone.createdBy ){
      return res.status(403).send({
        message: "Only Owner of the Drone is allowed to Delete Drone"
      })
    }

    res.status(200).json({
      success : true ,
      message : `${drone.name } , Fetched Successfully `,
      drone
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports =  { getOneDrone , getAllDrones , updateDrone, addDrone , deleteDrone };
