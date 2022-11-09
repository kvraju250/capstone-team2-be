//Import our model so we can us it to interact with the realated data in MongoDB
const JobRequest = require("../models/jobRequest.model")
const Appointment = require("../models/appointment.model")


//build our controller that will have our CRUD and other methods for our users
const jobRequestController = {

    //method to get all users using async/await syntax
    getJobRequests: async function(req, res){

        //create base query
        let query = {}

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            //use our model to find users that match a query.
            //{} is the current query which really mean find all the users
            //we use await here since this is an async process and we want the code to wait for this to finish before moving on to the next line of code
            let allJobRequests = await JobRequest.find(query)
            
            //return all the users that we found in JSON format
            res.json(allJobRequests)
            
        } catch (error) {
            console.log("error getting all job requests: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    },

    //method to job requestsb based on logged-in users using async/await syntax
    getJobRequestsByEmail: async function(req, res){

        
        const userEmail = req.params.email;

        let foundJobReqeusts = await JobRequest.find({email: userEmail})

            //if we found the user, return that user otherwise return a 404
            if(foundJobReqeusts){
                res.json(foundJobReqeusts)
            }else{
                res.status(404).send({
                    status: res.statusCode,
                    message: "Job requests Not Found by provided email!"
                })
            }        
    },

    //method to create a new job request
    createJobRequest: async function(req, res){

        try {

            //store job request data sent through the request
            const jobRequestData = req.body;

            //pass the jobRequestData to the create method of the JobRequest model
            let newJobRequest = await JobRequest.create(jobRequestData)

            //return the newly created job request
            res.status(201).json(await JobRequest.findById(newJobRequest._id))
            
        } catch (error) {
            //handle errors creating job request
            console.log("failed to create job request: " + error)
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

module.exports = jobRequestController;
