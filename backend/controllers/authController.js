const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');


// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "90d" }); // uses jwt secret to create a token which consists data like user.id
};

exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body; //parse incoming json in req body

    // Validation: Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" }); // checks if all fields are filled
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" }); // checks if email is unique or not
        }

        // Create the user
        const user = await User.create({
            fullName,
            email,                 
            password,
            profileImageUrl,
            userId: uuidv4()  //assigns unique user id
        });

        res.status(201).json({
            id: user._id,
            user,                    // after registration token is returned
            token: generateToken(user._id),
        });

    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });  // checks if email already exits

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Register User Info (example placeholder)
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");  // return everything except password using built in fn

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};