const express = require("express");
const router = express.Router();
const Car = require("../modals/car");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const resp = await Car.create(req.body);
    const findData = await Car.findOne({ _id: resp._id });
    console.log(findData);
    res.status(200).json({
      data: resp,
      message: "Record saved",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const data = await Car.find();
    res.status(200).json({
      success: true,
      data,
      message: "All Car details are get",
    });
  } catch (error) {
    res.status(400).json({
      error: error?.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedCar,
      message: "Car detail deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error?.message,
    });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    // console.log(req.body);
    const findData = await Car.findOne({ _id: resp._id });
    console.log(findData);
    res.status(200).json({
      data: resp,
      message: "Record Saved",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    // console.log(req.body);
    const resp = await Car.findByIdAndUpdate(req.params.id, req.body);
    const findData = await Car.findOne({ _id: resp._id });
    console.log(findData);

    res.status(200).json({
      data: resp,
      message: "Record Saved",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
