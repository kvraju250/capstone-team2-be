//bring in mongoose so we can create a schema that represents the data for a User
const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our Users
//More info: https://mongoosejs.com/docs/schematypes.html
const jobRequestSchema = new mongoose.Schema({
    // !! Need to change the folloiwng to be related to job requests
    firstName: {
        type: String, 
        required: true,
        minlength: 2
    },
    lastName: {
        type: String, 
        required: true,
        minlength: 2
    },
    email: { 
        type: String, 
        required: true, 
        index: { 
            unique: true 
        },
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    password: {
        type: String, 
        required: true,
        select: false
    }
})


//Generate the model our code with interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const JobRequest = mongoose.model('JobRequest', jobRequestSchema);

//export our model
module.exports = JobRequest;