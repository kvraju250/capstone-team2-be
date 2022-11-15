//Import our model so we can us it to interact with the realated data in MongoDB
const Appointment = require("../models/appointment.model")
const JobRequest = require("../models/jobRequest.model")


//build our controller that will have our CRUD and other methods for our users
const appointmentController = {

    //method to get all appointments using async/await syntax
    getAppointments: async function(req, res){

        //create base query
        let query = {}

        if(req.query.assigneduseremail){
            // console.log('email: ' + req.query.assigneduseremail)
            query.assignedUserEmail = req.query.assigneduseremail
        }

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            //use our model to find users that match a query.
            //{} is the current query which really mean find all the users
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            
            let allAppointments = await Appointment.find(query).populate("jobRequestData")
            res.json(allAppointments)

            
            // look up details for each job request?
            // show id, but pop up job request detail on click?




















            


            // let allAppointments = await Appointment.aggregate(
            //     [
            //         { "$addFields": { "jobReqeust_id": { "$toString": "$_id" }}},
            //         {
            //         $lookup: {
            //             from: "jobrequests",
            //             localField: "jobRequestID",
            //             // foreignField: "myId",
            //             foreignField: "jobReqeust_id",
            //             as: "appointments_full"
            //         }
            //     }]
            // )
            // // .find(query)



            // let allAppointments = await JobRequest.aggregate(
            //     [
            //         { "$addFields": { "jobReqeust_id": { "$toString": "$_id" }}},
            //         {
            //         $lookup: {
            //             from: "appointments",
            //             localField: "jobReqeust_id",
            //             foreignField: "jobRequestID",
            //             as: "appointments_full"
            //         }
            //     }]
            // )

            
            // //return all the users that we found in JSON format
            // res.json(allAppointments
            //     .filter( appt => appt.appointments_full.length > 0)
            //     .filter(appt => appt.appointments_full[0].assignedUserEmail == req.query.assigneduseremail)
            //     )
            
        } catch (error) {
            console.log("error getting all appointments: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },

    //method to appointments based on given ID using async/await syntax
    getAppointmentsById: async function(req, res){

        
        const appointmentId = req.params.id;

        let foundAppointments = await Appointment.find({_id: appointmentId})

        console.log ("found appot" + foundAppointments)

            //if we found the user, return that user otherwise return a 404
            if(foundAppointments && foundAppointments.length !== 0){
                res.json(foundAppointments)
            }else{
                res.status(404).send({
                    status: res.statusCode,
                    message: "Appointments Not Found by provided id!"
                })
            }        
    },

    //method to create a new appointment
    createAppointment: async function(req, res){

        try {

            //store appointment data sent through the request
            const appointmentData = req.body;

            //pass the appointmentData to the create method of the appointment model
            let newAppointment = await Appointment.create(appointmentData)

            //return the newly created appointment
            res.status(201).json(await Appointment.findById(newAppointment._id))
            
        } catch (error) {
            //handle errors creating appointment
            console.log("failed to create appointment: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    },

    //method to update a job reqeust
    updateAppointment: async function(req, res, next){

        try {

            //get the job request email from the request params
            const apptId = req.params.id;

            //store user data sent through the request
            const newApptData = req.body;

            //try to find our user by the email provided in the request params
            const foundAppt = await Appointment.findOne({_id: apptId})

            //update the user if we found a match and save or return a 404
            if(foundAppt){
                Object.assign(foundAppt, newApptData)
                await foundAppt.save()
            }else{
                res.status(404).send({message: "Appointment not found", statusCode: res.statusCode});
            }

            //respond with updated user
            res.json(await Appointment.findById(foundAppt._id))
            
        } catch (error) {
            console.log("failed to update appointment: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    },
   
    //method to delete an appointment
    deleteAppointment: async function (req, res, next) {
        try {

            const appointmentId = req.params.id;
            const appointment = await Appointment.findById(appointmentId);

            if (appointment) {
                Appointment.deleteOne(appointment, (error) => {
                    if (error)
                        throw error});
                res.status(202).send({ message: "Appointment deleted", statusCode: res.statusCode });
            } else {
                res.status(404).send({ message: "Appointment not found to delete", statusCode: res.statusCode });
            }
        } catch (error) {
            console.log("failed to delete appointment: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }
    }
}


module.exports = appointmentController;
