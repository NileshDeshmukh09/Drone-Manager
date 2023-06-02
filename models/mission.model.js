const mongoose = require('mongoose');

const waypointSchema = new mongoose.Schema({

    alt: {
        type: Number,
        required: true
    },

    lat: {
        type: Number,
        required: true
    },

    lng: {
        type: Number,
        required: true
    }
});

const missionSchema = new mongoose.Schema({

    alt: {
        type: Number,
        required: true
    },

    speed: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },

    createdBy : {
        type : String,
        required: true,
    },

    waypoints: {
        type: [waypointSchema],
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    siteID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

module.exports = mongoose.model('Mission', missionSchema);
