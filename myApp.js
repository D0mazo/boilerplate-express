let express = require('express');
require('dotenv').config();
let path = require('path');
let app = express();

// Root-level logger middleware MUST come first
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Serve static assets from /public
app.use("/public", express.static(__dirname + "/public"));

// Log "Hello World" to the console
console.log("Hello World");

// Respond with index.html from the views folder
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// JSON endpoint
app.get("/json", function (req, res) {
  let response = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response.message = response.message.toUpperCase();
  }
  res.json(response);
});

module.exports = app;












 module.exports = app;
