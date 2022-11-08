//bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our Users
//More info: https://mongoosejs.com/docs/schematypes.html
const jobRequestSchema = new mongoose.Schema({
    // !! Need to change the folloiwng to be related to job requests
    title: {
        type: String, 
        required: true,
        minlength: 2
    },
    description: {
        type: String, 
        required: true,
        minlength: 2
    },
    type: {
        type: String, 
        required: true,
        minlength: 2
    },
    dateNeeded: {
        type: Date, 
        required: false        
    },
    status: {
        type: String, 
        required: true        
    },
    zip: {
        type: Number, 
        required: true,
        minlength: 5

    },
    email: { 
        type: String, 
        required: true,        
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    }
    
})


//Generate the model our code with interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const JobRequest = mongoose.model('JobRequest', jobRequestSchema);

//export our model
module.exports = JobRequest;