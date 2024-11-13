const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const employeeSchema = new Schema({
  empid: {
    type: String,
    required: true,
  },

  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  emptype: {
    type: String,
    required: true,
  },

  ssn: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },

  bank: {
    type: String,
    required: true,
  },

  branch: {
    type: String,
    required: true,
  },
});
const employee = mongoose.model("Employee", employeeSchema);
module.exports = employee;
