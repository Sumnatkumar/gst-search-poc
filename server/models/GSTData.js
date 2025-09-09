const mongoose = require('mongoose');

const GSTDataSchema = new mongoose.Schema({
  gstin: {
    type: String,
    required: true,
    unique: true
  },
  legalName: {
    type: String,
    required: true
  },
  tradeName: {
    type: String
  },
  registrationDate: {
    type: Date
  },
  state: {
    type: String
  },
  businessType: {
    type: String
  },
  status: {
    type: String
  },
  address: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GSTData', GSTDataSchema);