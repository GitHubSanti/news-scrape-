var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));