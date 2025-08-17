let express = require('express');
require('dotenv').config();
let path = require('path');
let app = express();
let bodyParser = require('body-parser');  // ✅ require body-parser

app.use(bodyParser.urlencoded({ extended: false }));

app.route("/name")
  .get(function (req, res) {
    const { first, last } = req.query;   // From query string
    res.json({ name: `${first} ${last}` });
  })
  .post(function (req, res) {
    const { first, last } = req.body;    // From form body (parsed by body-parser)
    res.json({ name: `${first} ${last}` });
  });

app.get("/name", function (req, res) {
    const first = req.query.first;
    const last = req.query.last;
   res.json({ name: `${first} ${last}` });
});

app.get("/:word/echo", function (req, res) {
  const word = req.params.word;   // Capture the dynamic word from the URL
  res.json({ echo: word });       // Respond with JSON
});

app.get('/now', function (req, res, next) {
  // Middleware: attach current time to req.time
  req.time = new Date().toString();
  next(); // Pass control to the next handler
}, function (req, res) {
  // Final handler: send JSON response
  res.json({ time: req.time });
});

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













