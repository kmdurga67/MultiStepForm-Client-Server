const express = require("express");
const router = express.Router();
const FormDataModel = require("../models/formDataModel");

router.use(express.json());

// Controller function to handle saving form data to the database where it took two parameters: req (request) and res (response).
const saveFormData = async (req, res) => {
  const formData = new FormDataModel({
    ...req.body,
  });

  try {
    await formData.save();
    res
      .status(201)
      .json({ message: "Form data saved successfully!", form: formData });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Failed to save form data." });
  }
};

// Endpoint to save form data to the database
router.post("/", saveFormData);

module.exports = router;
