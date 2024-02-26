const express = require("express");
const mongoose= require("mongoose")
const awsSchema = new mongoose.Schema({
    awslink:{
        type:String
    }
})

module.exports = {
    awsdetails: mongoose.model("awslogs", awsSchema),
  };