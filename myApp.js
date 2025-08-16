let express = require('express');
let app = express();

// Log "Hello World" to the console
console.log("Hello World");

// Respond with "Hello Express" when the root URL ("/") is requested
app.get("/", function (req, res) {
  res.send("Hello Express");
});

module.exports = app;



















 module.exports = app;
