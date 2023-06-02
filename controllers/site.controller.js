
const Site = require('../models/site.model');

// Add a new site
exports.createSite = async (req, res) => {
  try {
    const { site_name, position } = req.body;

    // Validate request body
    if (!site_name  ) {
      return res.status(400).json({ error: 'please provide site name ' });
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


    const updatedSite = await Site.findByIdAndUpdate(
      id,
      { site_name, position },
      { new: true }
    );

    if ( !updatedSite ) {
      return res.status(404).json({ 
        success : false,
        error: 'Site not found' });
    }

    res.status(200).send({
      success : true,
      message : `${updatedSite.site_name}, updated Successfully `,
      updatedSite
    });
  } catch (error) {
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

