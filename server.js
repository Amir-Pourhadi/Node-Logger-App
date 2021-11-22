const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

// Initialize the app and set the port
const app = express();
const port = process.env.PORT || 3000;

// Add morgan token to each request
morgan.token("id", (req) => req.id);

// Set a random uuid to each request
app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

// Use a Sample morgan token
morgan.token("param", (req, res, param) => "userToken");

// Use morgan to log requests to the console
morgan.format("myFormat", ":id :method :url :status :response-time ms :param");
app.use(morgan('myFormat'));

// Home route
app.get("/", (req, res) => {
  res.send("Morgan Logger App!");
});

// Listen on the port and Set up the logger
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
