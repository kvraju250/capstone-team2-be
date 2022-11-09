//Import our model so we can us it to interact with the realated data in MongoDB
const Appointment = require("../models/appointment.model")


//build our controller that will have our CRUD and other methods for our users
const appointmentController = {

    //method to get all appointments using async/await syntax
    getAppointments: async function(req, res){

        //create base query
        let query = {}

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            //use our model to find users that match a query.
            //{} is the current query which really mean find all the users
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let allAppointments = await Appointment.find(query)
            
            //return all the users that we found in JSON format
            res.json(allAppointments)
            
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
    updateJobReqeust: async function(req, res, next){

        try {

            //get the job request email from the request params
            const jobreqemail = req.params.email;

            //store user data sent through the request
            const newJobReqData = req.body;

            //try to find our user by the email provided in the request params
            const jobReq = await JobRequest.findOne({email: jobreqemail})

            //update the user if we found a match and save or return a 404
            if(jobReq){
                Object.assign(jobReq, newJobReqData)
                await jobReq.save()
            }else{
                res.status(404).send({message: "Job Request not found", statusCode: res.statusCode});
            }

            //respond with updated user
            res.json(await JobRequest.findById(jobReq._id))
            
        } catch (error) {
            console.log("failed to update job request: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    },
    //method to get all users using async/await syntax
    getUser: async function(req, res){

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {

            //get the email address of the user from the url parameters
            const userEmail = req.params.email;
            
            //use our model to find the user that match a query.
            //{email: some@email.com} is the current query which really mean find the user with that email
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let foundUser = await User.findOne({email: userEmail})

            //if we found the user, return that user otherwise return a 404
            if(foundUser){
                res.json(foundUser)
            }else{
                res.status(404).send({
                    status: res.statusCode,
                    message: "User Not Found!"
                })
            }
            
        } catch (error) {
            console.log("error getting user: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find the user
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    }
    

}

module.exports = appointmentController;
