const express = require('express');
const router = express.Router();

//middleware used to require authentication
const { validateJwtMiddleware } = require("../auth");

//import the appointment controller to handle our job request routes
const appointmentController = require("../controllers/appointment.controller")

//post route to create an appointment
// will want to add jwt to this route
router.post("/", appointmentController.createAppointment)

//get route to return all job requests (requires auth)
// keeping "validateJwtMiddlewear" means this route requires authentication
router.get("/", appointmentController.getAppointments)

// this is get route to retuan all job requests by user email
router.get("/:id", appointmentController.getAppointmentsById)

//get route to return a specific users (requires auth)
// router.get("/:email", validateJwtMiddleware, userController.getUser)

//put route to update an appointment (requires auth)
router.put("/:id", appointmentController.updateAppointment)

//delete route to delete an appointment (requires auth)
router.delete("/:id", appointmentController.deleteAppointment)

module.exports = router;
