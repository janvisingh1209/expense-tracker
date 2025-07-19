const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const{upload}= require("../middleware/uploadMiddleware")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);
// image uploaded on upload-image path
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" }); 
    }
    
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;  // the img from uploadmiddleware is returned along with host and filename which has both ddate.now and filename , protocol can be https more secure or http not secure
    res.status(200).json({ imageUrl });
});


module.exports = router;
