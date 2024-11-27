const Doctor = require('../model/doctorModel'); // Import the Doctor model
const multer = require('multer');
const path = require('path');

// Set up storage for multer to save images in 'public/images' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename to avoid conflicts
    }
});

var upload = multer({ storage: storage });
// Create a new doctor

const createDoctor = async (req, res) => {
    try {
      const { fullName, specialty, email, phone, biography, qualifications, status } = req.body;
      
      // Check if the image was uploaded successfully
      if (!req.file) {
        return res.status(400).json({
          message: 'No image uploaded',
        });
      }
  
      // Save the new doctor record, including the profile picture URL
      const newDoctor = new Doctor({
        fullName,
        specialty,
        email,
        phone,
        profilePicture:  path.basename(req.file.path), // Store the relative path to the image
        biography,
        qualifications,
        status,
      });
  
      const savedDoctor = await newDoctor.save();
      res.status(201).json({
        message: 'Doctor created successfully!',
        data: savedDoctor,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error creating doctor',
        error: error.message,
      });
    }
  };
// const createDoctor = async (req, res) => {
//   try {
//     const { fullName, specialty, email, phone, profilePicture, biography, qualifications, status } = req.body;

//     const newDoctor = new Doctor({
//       fullName,
//       specialty,
//       email,
//       phone,
//       profilePicture,
//       biography,
//       qualifications,
//       status,
//     });

//     const savedDoctor = await newDoctor.save();
//     res.status(201).json({
//       message: 'Doctor created successfully!',
//       data: savedDoctor,
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: 'Error creating doctor',
//       error: error.message,
//     });
//   }
// };

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      message: 'Doctors retrieved successfully!',
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving doctors',
      error: error.message,
    });
  }
};

// Get a single doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      message: 'Doctor retrieved successfully!',
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving doctor',
      error: error.message,
    });
  }
};

// Update a doctor by ID
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, specialty, email, phone, profilePicture, biography, qualifications, status } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { fullName, specialty, email, phone, profilePicture, biography, qualifications, status },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      message: 'Doctor updated successfully!',
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating doctor',
      error: error.message,
    });
  }
};

// Delete a doctor by ID
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    res.status(200).json({
      message: 'Doctor deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting doctor',
      error: error.message,
    });
  }
};

// Export all functions
module.exports = {
    upload,
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
