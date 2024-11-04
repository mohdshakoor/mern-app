const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const userRoute = require('./router/userRoutes');
const cors = require("cors");
app.use(cors());

mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("Running successfully at", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

  app.use(userRoute)

