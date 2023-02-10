const express = require("express");
const { authenticate } = require("../Middlewere/Authenticator.middlewere");
const AddressModel = require("../model/Address.model");
const { ProductsModel } = require("../model/Products.model");
const AddressRouter = express.Router();
AddressRouter.use(express.json());
// AddressRouter.use("/addaddress", authenticate);
  // i will pass it from local storage and then it will convert to id then i will get allcartdata  of that perticular person only
  AddressRouter.post("/addaddress", async (req, res) => {
    try {
        const newaddress =AddressModel(payload);
        await newaddress.save();
      res.send([{"msg":"New Address Added Succesfully"}]);}
      catch(err){
        res.send("faild")
      }
    })
module.exports = { AddressRouter};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2RlMDVmMTI2YjdmNzUyNGQ5MjE0MDUiLCJpYXQiOjE2NzU0OTQ5MjYsImV4cCI6MTY3NTY2NzcyNn0.7kUoCYr2TUI01iYzFAJ0Geb1GHsxOc_JZoFmvsbwZ34