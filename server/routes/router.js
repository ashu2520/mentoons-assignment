const express = require("express");
const upload = require("../config/multer"); 
const userLogin = require("../controllers/userLogin");
const uploadComic = require("../controllers/uploadComic");
const router = express.Router();

router.post("/api/user-login", userLogin);
router.post("/api/comic-upload", upload.single('myFile'), uploadComic); // Use 'upload' here

module.exports = router;
