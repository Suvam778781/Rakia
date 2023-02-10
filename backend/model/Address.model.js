const mongoose = require('mongoose');
const { type } = require('os');

const addressSchema = mongoose.Schema({
  pincode: {
    type: String,
    required: true,
  
  },
  mobile: {
    type: String,
    required: true,
   
  },
  alternateMobile: {
    type: String,
   
  },
  name: {
    type: String,
    required: true,
   
  },
  city: {
    type: String,
    required: true,
   
  },
  state: {
    type: String,
    required: true,
 
  },
  landmark: {
    type: String,
   
  },
  area: {
    type: String,
    required: true,
    
  },
  flatNo: {
    type: String,
   
  },
  isPrimary: {
    type: Boolean,
    required: true
  },
  userID:{
    // required:true,
   type:String
  }
});

const AddressModel = mongoose.model('Address', addressSchema);

module.exports = AddressModel;