const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

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
morgan.token("param", () => "userToken");

// Use stream to write morgan's logs to a file instead of the console
// "a" flag to append to the file instead of overwriting it
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

// Set morgan format
morgan.format("myFormat", ":id :method :url :status :response-time ms :param");

// Use morgan to log requests to the console
app.use(morgan("myFormat"));

// Use morgan to log requests to the access.log file
app.use(morgan("myFormat", { stream: accessLogStream }));

// Home route
app.get("/", (req, res) => {
  res.send("Morgan Logger App!");
});

// Listen on the port and Set up the logger
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
