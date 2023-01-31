const express = require("express");
const { authenticate } = require("../Middlewere/Authenticator.middlewere");
const { ProductsModel } = require("../model/Products.model");
const productsRouter = express.Router();
productsRouter.use(express.json());
productsRouter.use("/", authenticate);
productsRouter.get("/", async (req, res) => {
let products=await NoteModel.find()
  res.send(products);
});
productsRouter.post("/create", async (req, res) => {

  const payload = req.body;
  try {
    const new_note = ProductsModel(payload);
    await new_note.save();
    res.send("Create Succesfully");
  } catch (err) {
    res.send("something went wrong");
  }
});
productsRouter.patch("/update:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const note=await ProductsModel.findOne({_id:id})
  const userID_in_note=note.userID
const userID_in_making_req=req.body.userID

  try {
    await ProductsModel.findByIdAndUpdate({ _id: id }, data);
    res.end("Note Update Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});

productsRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await NoteModel.deleteOne({ _id: id });
    res.end("Note Delete Succesfully");
  } catch (err) {
    res.send("err:something went wrong");
  }
});
module.exports = {productsRouter };
