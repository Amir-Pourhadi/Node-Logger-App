const express = require("express");
const morgan = require("morgan");

// Initialize the app and set the port
const app = express();
const port = process.env.PORT || 3000;

// Listen on the port and Set up the logger
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
