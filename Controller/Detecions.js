const IllegalParking = require('../models/IllegalParking');

// Add an illegal parking detection
const addDetection = async (req, res) => {
  try {
    const { title, location, time, status } = req.body;

    // Validate input
    if (!title || !location || !time) {
      return res.status(400).json({ message: 'Title, location, and time are required.' });
    }

    // Create a new illegal parking record
    const newDetection = new IllegalParking({
      title,
      location,
      time,
      status: status || 'Pending', // Default to 'Pending' if no status provided
    });

    await newDetection.save(); // Save to database

    return res.status(201).json({ 
      message: 'Illegal parking detection added successfully.', 
      data: newDetection 
    });
  } catch (error) {
    console.error('Error adding illegal parking detection:', error);
    return res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

module.exports = { addDetection };
