const express = require("express");
const mongoose = require("mongoose");
const user = require('../models/userModel')
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const userAdded = await user.create({ name, email, age });
    res.status(201).json(userAdded);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error code in MongoDB
      res.status(400).json({ error: "Email already exists" });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ error: "Validation error: " + error.message });
    } else {
      console.error("Error creating user:", error.message);
      res.status(500).json({ error: "Failed to add user" });
    }
  }
});

//get
router.get("/", async (req, res) => {
  try {
    const showAll = await user.find();
    res.status(200).json(showAll);
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});

//get single user

router.get("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const singleuser = await user.findById({_id:id});
    res.status(200).json(singleuser);
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});

//delete user

router.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    const deleteuser = await user.findByIdAndDelete({_id:id});
    res.status(200).json(deleteuser);
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});

//edit user
router.patch("/:id", async (req, res) => {
  const {id} = req.params;
  const { name, email, age } = req.body;
  try {
    const updateuser = await user.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(updateuser);
  } catch (error) {
    res.send(500).json({ error: error.message });
  }
});


module.exports = router;