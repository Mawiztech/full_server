const mongoose = require("mongoose")


const PersonBio = mongoose.Schema({
    Name: {type: String},
    email: {type: String, require:true},
    Age: {type:Number},
})


const person = new mongoose.model("Bio", PersonBio)

module.exports = person

