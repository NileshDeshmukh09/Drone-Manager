const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
 
  droneType: {
    type: String,
    required: true,
    
  },

  makeName: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true, 
    unique : true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  createdBy: {
    type: String,
    required : true,
  },


  siteID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
  },

});

module.exports = mongoose.model('Drone', droneSchema);
