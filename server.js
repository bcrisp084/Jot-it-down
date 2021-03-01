// The npm package we reqiure for the app

const express = require("express");

// Tells node we are creating an express server

const app = express();

// The port we are listening on

const Port = process.env.Port || 3001;

// Sets up the express app to handle the data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// These are the files we want our server pointed at

require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

// Starts the server

app.listen(Port, function () {
  console.log("App listening on port: " + Port);
});
