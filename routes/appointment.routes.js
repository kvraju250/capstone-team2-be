const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the user controller to handle our job request routes
const appointmentController = require("../controllers/appointment.controller")

//post route to create a job request
router.post("/", appointmentController.createJobRequest)

//get route to return all job requests (requires auth)
// keeping "validateJwtMiddlewear" means this route requires authentication
router.get("/", appointmentController.getAppointments)

// this is get route to retuan all job requests by user email
router.get("/:id", appointmentController.getAppointmentsById)

//get route to return a specific users (requires auth)
// router.get("/:email", validateJwtMiddleware, userController.getUser)

//put route to update a user (requires auth)
router.put("/:email", appointmentController.updateJobReqeust)

module.exports = router;
