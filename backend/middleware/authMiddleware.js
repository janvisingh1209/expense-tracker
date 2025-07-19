
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];  // extracts the token part from authorization part in header where req was sent
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // checks token validity from db by decoding token and extracting userid(mongodb id)
        req.user = await User.findById(decoded.id).select('-password');
        next(); // to move onto next fn like getuserinfo
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};