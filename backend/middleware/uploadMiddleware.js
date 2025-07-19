const multer = require('multer');
//multer uploads img on uploads/
// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {    //stores user input like photos or files cb is callback function 
        cb(null, 'uploads/');  // stores the image sent via /upload-image
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // files are stored with original filename along with the timestamp
    }
});

// File filter
//this fn runs first first the files are filtered acc to type then stored using storage fn
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/jpg']; // limits access to only imgs with jpg png etc
    if (allowedTypes.includes( file.mimetype)) {
        cb(null, true); //accepts the file in apt format mentioned abv
    } else {
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter }); // combines storage and file filter
// filename returned as  "1642123456789-photo.jpg" where the no. is date.now
module.exports = {upload};
//User selects image → Clicks upload
//Multer processes → Saves file as "1642123456789-photo.jpg" in uploads/
//Code generates URL → "http://localhost:3000/uploads/1642123456789-photo.jpg"
//Response sent → { "imageUrl": "http://localhost:3000/uploads/1642123456789-photo.jpg" }