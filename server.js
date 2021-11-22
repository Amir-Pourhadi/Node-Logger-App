const express = require("express");
const morgan = require("morgan");

// Initialize the app and set the port
const app = express();
const port = process.env.PORT || 3000;

// Use morgan to log requests to the console
app.use(morgan(":method :status :url 'HTTP/:http-version'"));

// Home route
app.get("/", (req, res) => {
  res.send("Morgan Logger App!");
});

// Listen on the port and Set up the logger
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
