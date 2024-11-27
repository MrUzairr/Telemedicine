const bcrypt = require('bcrypt');
const User = require("../model/userModel");
const generateLoginToken = require("./userController"); // Corrected name
const {oauth2Client} = require('../utils/google_config');
const axios = require('axios');
const JWT_TIMEOUT = process.env.JWT_TIMEOUT;
const JWT_SECRET = process.env.JWT_SECRET;
async function loginUser(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Compare the hashed password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

    // Generate JWT token for the logged-in user
    const token = generateLoginToken.GenerateToken(user);

    return res.status(200).json({
      message: "Logged in successfully",
      email: user.email,
      userid: user.id,
      isAdmin: user.isAdmin,
      token: token, // Send token in the response
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

const googleAuth = async (req, res, next) => {
  const code = req.query.code;
  try {
      const googleRes = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(googleRes.tokens);
      const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
      );
      const { email, name, picture } = userRes.data;
      let user = await User.findOne({ email });
      console.log("user",user)

      if (!user) {
          user = await User.create({
              name,
              email,
              picture
          });
      }
      const { _id } = user;
      const token = jwt.sign({ _id, email },
          JWT_SECRET, {
          expiresIn: JWT_TIMEOUT,
      });
      res.status(200).json({
          message: 'success',
          token,
          user,
      });
  } catch (err) {
      res.status(500).json({
          message: "Internal Server Error"
      })
  }
};

module.exports = {loginUser,googleAuth}

