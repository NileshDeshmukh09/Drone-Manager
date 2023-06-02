
const Site = require('../models/site.model');
const User = require('../models/user.model');

// Add a new site
exports.createSite = async (req, res) => {
  try {
    const { site_name, position } = req.body;

    // Validate request body
    if (!site_name  ) {
      return res.status(400).json({ error: 'please provide site name ' });
    }

    const existedSite = await Site.findOne({ site_name : site_name});
    console.log(existedSite);

    if( existedSite  ){
      return res.status(400).json({ error: 'Site already exists ! ' });
    }
    if ( !position ) {
      return res.status(400).json({ error: 'position not provided ' });
    }
    if (  !position.latitude ) {
      return res.status(400).json({ error: 'Latitude not provided ' });
    }
    if (  !position.longitude ) {
      return res.status(400).json({ error: 'Longitude not provided ' });
    }

    const newSite = new Site({ site_name, position });
    const savedSite = await newSite.save();

    res.status(200).send({
        success : true,
        message : `${savedSite.site_name} , Added Successfully !`,
        savedSite
    });
    
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};

// // Update a site
exports.updateSite = async (req, res) => {

  try {

    const { id } = req.params;
    const { site_name, position } = req.body;

    // Validate request body
    // if (!site_name  ) {
    //   return res.status(400).json({ error: 'please provide site name ' });
    // }
    // if ( !position ) {
    //   return res.status(400).json({ error: 'position not provided ' });
    // }
    // if (  !position.latitude ) {
    //   return res.status(400).json({ error: 'Latitude not provided ' });
    // }
    // if (  !position.longitude ) {
    //   return res.status(400).json({ error: 'Longitude not provided ' });
    // }


    const site = await Site.findOne({
      _id :  id
    });
    console.log("site Found !!!!!");
    if ( !site ) {
      return res.status(404).json({ 
        success : false,
        error: 'Site not found' });
    }

    site.site_name  = site_name != undefined ? site_name : site.site_name;
    site.position.latitude = position.latitude != undefined ? position.latitude : site.position.latitude;
    site.position.longitude =  position.longitude != undefined ? position.longitude  : site.position.longitude ;

    console.log("Changes Saved !!!!!");

    
     /** 
        * Saved the Changed Site
      */
    const updatedSite = await site.save();

    res.status(200).send({
      success : true,
      message : `${updatedSite.site_name}, updated Successfully `,
      updatedSite
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

 // Delete a site
exports.deleteSite =  async (req, res) => {

  try {
    const { id } = req.params;

    const deletedSite = await Site.findByIdAndDelete(id);

    if (!deletedSite) {
      return res.status(404).json({ error: 'Site not found' });
    }

    res.json({ 
      success : true,
      message: 'Site deleted successfully' 
    
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all sites
exports.getAllSites =  async (req, res) => {

  try {
    const sites = await Site.find();
    res.status(200).json({
      success : true ,
      message : "Fetched all Sites !",
      sites});

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get site by ID
exports.getSite =  async (req, res) => {

  try {
    const { id } = req.params;

    const site = await Site.findById(id);

    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    res.status(200).json({
      success : true,
      message : `${site.site_name} , Get successfully !`,
      site
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

