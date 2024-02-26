const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { awsdetails } = require("../model/awsSchema");

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    },
    region: BUCKET_REGION
});

const postImage = async (req, res) => {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const objectUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${req.file.originalname}`;
        console.log("Uploaded image URL:", objectUrl);

        const data = await new awsdetails({
             awslink:objectUrl // Corrected key name to match your Mongoose schema
        });
        console.log(data)

        await data.save(); // Corrected method to save the document to the database

        res.status(200).json({ success: true,  objectUrl });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });
    }
}


const getImage = async (req, res) => {
    try {
        const response = await awsdetails.find(); 
        res.status(200).json({
            message: "Successfully fetched the data",
            data: response
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: "Oops couldn't fetch the data",
            error: error
        })
    }
}

module.exports = { postImage, getImage }
