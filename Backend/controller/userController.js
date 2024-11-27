const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // Path to your User model file


// Secret key for JWT (in a real application, use an environment variable)
const JWT_SECRET = process.env.JWT_SECRET;

// Route to register a new user
async function addUser(req,res){
  const { first_name, last_name, email, password, zip_code, gender, date_of_birth } = req.body;
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      zip_code,
      gender,
      date_of_birth,
      is_varified: false
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Optionally generate a JWT token
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email, isAdmin: savedUser.isAdmin },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token, // Include the token for immediate login, if desired
      user: {
        id: savedUser._id,
        email: savedUser.email,
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
        isAdmin: savedUser.isAdmin,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

async function getAllUser(req,res){
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

async function updateUser(req,res){
    try {
        console.log(req.params.id)
        console.log(req.body)
        const users = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
async function deleteUser(req,res){
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
// // Functions for user
function GenerateToken(user) {
  const payload = {
    role: user.role,  // User's role, could be 'admin', 'user', etc.
    id: user._id,     // User's unique ID
  };

  try {
    // Adding a token expiration time of 1 hour (you can change it as per your requirement)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (err) {
    throw new Error("Error generating JWT token: " + err.message);
  }
}




module.exports = {
    getAllUser,
    addUser,
    updateUser,
    deleteUser,
    GenerateToken

};