const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    departments: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
});

const employeeModel = mongoose.model('Employee', employeeSchema);
module.exports = employeeModel;