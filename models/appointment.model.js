//bring in mongoose so we can create a schema that represents the data for an appointment
const mongoose = require("mongoose");

//Create our schema using mongoose that contains the fields and their data types for our appointments
//More info: https://mongoosejs.com/docs/schematypes.html
const appointmentSchema = new mongoose.Schema({
    jobRequestID: {
        type: String, 
        required: true,
    },
    assignedUserEmail: {
        type: String, 
        required: true,
        match: [/.+\@.+\..+/, "Invalid E-mail Address"],
    },
    date: {
        type: Date, 
        required: true     
    }, 
})


//Generate the model our code with interact with from the above schema
//Models allow us to interact with the data inside our MongoDB collections
//More info: https://mongoosejs.com/docs/models.html
const Appointment = mongoose.model('Appointment', appointmentSchema);

//export our model
module.exports = Appointment;