const cors = require("cors");
const express = require("express");
const app = express();
const meetingRoomsController = require("./controllers/meetingRoomsController");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my page");
});

app.use("/meeting-rooms", meetingRoomsController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
