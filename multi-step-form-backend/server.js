const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connected to MongoDB
mongoose
  .connect("mongodb://localhost:27017/my-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("failed");
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

// Created a schema as per my form data
const formDataSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  agree: { type: Boolean, required: true },
  // profilePicture: { type: String},
  hobbies: [String],
  gender: { type: String, required: true },
  graduation: { type: String, required: true },
  alternatemobile: { type: String },
  country: { type: String, required: true },
  state: { type: String, required: true },
  profile: {type:String, required:true}  //storing blob url in profile variable
});

// Create a model for the form data
const FormDataModel = mongoose.model("FormData", formDataSchema);



// Parse incoming JSON data
app.use(bodyParser.json());

// Endpoint to save form data to the database, including profilePicture
app.post("/api/formdata", (req, res) => {
  
    // Create a new FormDataModel instance and populate it with the form data
    const formData = new FormDataModel({
      ...req.body,
     // profilePicture: req.file ? req.file : null,
    });

    try {
       formData.save();
      res.status(201).json({ message: "Form data saved successfully!",form: formData });
    } catch (error) {
      console.error("Error saving form data:", error);
      res.status(500).json({ error: "Failed to save form data." });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});