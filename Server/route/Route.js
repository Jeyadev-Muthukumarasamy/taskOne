// route/Route.js
const express = require("express");
const multer = require("multer");
const {postImage,getImage} = require("../Controller/imageController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

router.post("/upload", upload, postImage);
router.get("/getImage",getImage)

module.exports = router;