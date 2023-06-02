const express = require('express');
const router = express.Router();
const Mission = require('../models/mission.model');
const User = require('../models/user.model');
const Site = require('../models/site.model');
const Drone = require('../models/drone.model');
const Category = require('../models/category.model');

// Create a new mission
const createMission = async (req, res) => {

    try {

        const {
            alt,
            speed,
            name,
            waypoints,
            categoryID,
            siteID
        } = req.body;

        // Validate the request body
        if (!alt || !speed || !name || !waypoints || !categoryID || !siteID) {
            return res.status(400).json({ error: 'Missing required fields' });
        }


        const checkMission = await Mission.findOne({ name: name });

        if (checkMission) {
            return res.status(400).send({ error: "Mission already exists" });
        }


        // Mission can be made on available sites only 
        const site = await Site.findOne({ _id: siteID });
        if (!site) {
            return res.status(400).send({ error: "Site doesn't exists " });
        }

        // Each Mission has one category
        const category = await Category.findOne({ _id: categoryID });
        if (!category) {
            return res.status(400).send({ error: "Category doesn't exists " });
        }



        /** User ID of reported must be present in x-access-token */
        const user = await User.findOne({
            _id: req.userID
        });


        if (!user) {
            return res.status(404).json({ error: 'UnAuthorised API' });
        }

        createdBy = user.username;

        const mission = new Mission({
            alt,
            speed,
            name,
            createdBy,
            waypoints,
            categoryID,
            siteID
        });

        const newMission = await mission.save();

        res.status(200).json({
            success: true,
            message: `${newMission.name} , Created Successfully `,
            newMission
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// Update a mission by ID
const updateMission = async (req, res) => {

    try {
        const { alt, speed, name, waypoints, categoryID, siteID } = req.body;
        const missionID = req.params.id;

        // // Validate the request body
        // if (!alt || !speed || !name || !waypoints || !categoryID || !siteID) {
        //     return res.status(400).json({ error: 'Missing required fields' });
        // }

        // Check if the mission exists
        const existingMission = await Mission.findById(missionID);
        if (!existingMission) {
            return res.status(404).json({ error: 'Mission not found' });
        }


        /** User ID of reported must be present in x-access-token */
        const user = await User.findOne({
            _id: req.userID
        });


        if (!user) {
            return res.status(404).json({ error: 'UnAuthorised API' });
        }


        // Update the mission fields
        existingMission.alt = alt != undefined ? alt : existingMission.alt;
        existingMission.speed = speed != undefined ? speed : existingMission.speed;
        existingMission.name = name != undefined ? name : existingMission.name;
        existingMission.createdBy = existingMission.createdBy;
        existingMission.siteID = existingMission.siteID;
        existingMission.categoryID = existingMission.categoryID;


        if (user.username != existingMission.createdBy) {
            return res.status(403).send({
                message: "Only Owner of the Mission is allowed to update Mission"
            })
        }


        // Save the updated mission
        const updatedMission = await existingMission.save();

        res.status(200).json({
            success: true,
            message: `${updatedMission.name}, Updated Successfully`,
            updatedMission
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// Get all missions
const getAllMissions = async (req, res) => {



    try {

        /** User ID of reported must be present in x-access-token */
        const user = await User.findOne({
            _id: req.userID
        });

        if (!user) {
            return res.status(404).json({ error: 'UnAuthorised API' });
        }

        const queryObj = {
            createdBy: user.username,
        }

        if (req.query.siteID != undefined) {
            queryObj.siteID = req.query.siteID;
        };

        if (req.query.categoryID != undefined) {
            queryObj.categoryID = req.query.categoryID;
        };
        const missions = await Mission.find(queryObj);

        res.status(200).json({
            success: true,
            message: `Mission Fetched !`,
            TotalMission : missions.length ,
            missions
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// Get a specific mission by ID
const getOneMission = async (req, res) => {

    try {

        /** User ID of reported must be present in x-access-token */
        const user = await User.findOne({
            _id: req.userID
        });

        if (!user) {
            return res.status(404).json({ error: 'UnAuthorised API' });
        }

        const mission = await Mission.findOne({ createdBy: user.username, _id: req.params.id });

        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }
        res.status(200).json({
            success: true,
            message: `${mission.name}, Fetched Successfully `,
            mission
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// Delete a mission by ID
const deleteMission = async (req, res) => {

    try {
        const missionID = req.params.id;

        // Check if the mission exists
        const existingMission = await Mission.findById(missionID);
        if (!existingMission) {
            return res.status(404).json({ error: 'Mission not found' });
        }

        /** User ID of reported must be present in x-access-token */
        const user = await User.findOne({
            _id: req.userID
        });

        if (!user) {
            return res.status(404).json({ error: 'UnAuthorised API' });
        }

        if (user.username != existingMission.createdBy) {
            return res.status(403).send({
                message: "Only Owner of the Drone is allowed to Delete Mission"
            })
        }

        // Delete the mission
        await existingMission.remove();

        res.status(200).json({
            success: true,
            message: 'Mission deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createMission,
    updateMission,
    getAllMissions,
    getOneMission,
    deleteMission
};



