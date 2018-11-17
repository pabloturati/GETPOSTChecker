/*********************************************************************
 ** Author: Pablo Turati ID#: 933198349 turatip@oregonstate.edu
 ** Date: September 27th, 2018
 ** Description: "Assignment 1"
 *********************************************************************/

var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});
var bodyParser = require("body-parser");

//POST middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handlebars setup
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

//Set port
app.set("port", 3000);

//Get Request handler
app.get("/", (req, res) => {
  const serveObj = {
    serverVerb: "GET",
    paramList: []
  };
  //Get the queries
  for (let param in req.query) {
    serveObj.paramList.push({
      name: param,
      content: req.query[param]
    });
  }
  res.render("home", serveObj);
});

//Post Request handler
app.post("/", (req, res) => {
  const serveObj = {
    serverVerb: "POST",
    paramList: []
  };
  //Get the queries
  for (let param in req.body) {
    serveObj.paramList.push({
      name: param,
      content: req.body[param]
    });
  }
  res.render("home", serveObj);
});

//Page not found handler
app.use(function(req, res) {
  res.status(404);
  res.render("404");
});

//Default error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

//Port callback
app.listen(app.get("port"), function() {
  console.log(
    "Listening on port:" + app.get("port") + "; press Ctrl-C to terminate."
  );
});
