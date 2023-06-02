
/**
* Schema for the SITE Model will be provided Here
*/
const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({

  site_name: {
    type: String,
    unique : true,
    required: true,
  },

  position: {
    
    latitude: {
      type: String,
      required: true
    },

    longitude: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Site', siteSchema);
