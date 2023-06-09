const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({

  name: {
    type: String,
    unique : true,
    required: true,
  },

  color: {
    type: String,
    required: true
  },

  tagName: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

});

module.exports = mongoose.model('Category', categoriesSchema);
