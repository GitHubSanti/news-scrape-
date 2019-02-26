// Dependencies
require("dotenv").config();
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Require all models
var db = require("./models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper", {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Import routes and give the server access to them.
// var routes = require("./controllers/burgers_controller.js");
// app.use(routes);

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request via axios for the news section of `ycombinator`
  axios.get("https://www.washingtonpost.com/").then(function(response) {
    // Load the html body from axios into cheerio
    var $ = cheerio.load(response.data);

    $(`.headline.normal-style`).each(function(i, element) {
      var result = {};

      if (
        $(this)
          .next()
          .filter(`.blurb.normal.normal-style`).length !== 0
      ) {
        result.title = $(this).text();
        result.link = $(this)
          .children(`a`)
          .attr(`href`);
        result.summary = $(this)
          .next()
          .filter(`.blurb.normal.normal-style`)
          .text();

        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});

// Homepage
app.get("/", function(req, res) {
  db.Article.find({})
    .then(function(mongooseRes) {
      // res.json(dbArticle)
      var articlesToShow = {
        dbArticles: mongooseRes
      }
      // console.log(articlesToShow)
      res.render("index", articlesToShow);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
