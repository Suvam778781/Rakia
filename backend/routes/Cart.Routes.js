// const express = require("express");
// const { authenticate } = require("../Middlewere/Authenticator.middlewere");
// const { ProductsModel } = require("../model/Products.model");
// const productsRouter = express.Router();
// noteRouter.use(express.json());
// noteRouter.use("/", authenticate);
// noteRouter.get("/", async (req, res) => {
// let notes=await NoteModel.find()
//   res.send(notes);
// });
// productsRouter.post("/create", async (req, res) => {
//   const payload = req.body;
//   try {
//     const new_note = ProductsModel(payload);

//     await new_note.save();
//     res.send("Create Succesfully");
//   } catch (err) {
//     res.send("something went wrong");
//   }
// });