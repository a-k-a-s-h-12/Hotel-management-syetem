const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paidsalarySchema = new Schema({
  paymentid: {
    type: String,
    required: true,
  },

  emplid: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  accountnumber: {
    type: String,
    required: true,
  },

  basicsalary: {
    type: String,
    required: true,
  },
  totalsalary: {
    type: Number,
    required: true,
  },

  paiddate: {
    type: Date,
    required: true,
  },
});
const paidsalary = mongoose.model("paidsalary", paidsalarySchema);
module.exports = paidsalary;
