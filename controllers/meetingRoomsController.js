const express = require("express");
const meetingRooms = express.Router();
const {
  getAllMeetingRooms,
  getMeetingRoom,
  createMeetingRoom,
} = require("../queries/meetingRoom");

/* GET home page. */
meetingRooms.get("/", async (req, res) => {
  const meetingRooms = await getAllMeetingRooms();
  res.json(meetingRooms);
});

meetingRooms.get("/:id", async (req, res) => {
  const meetingRoom = await getMeetingRoom(req.params.id);
  if (meetingRoom) {
    res.json(meetingRoom);
  } else {
    res.status(404).json({ success: false, error: true, message: "invalid" });
  }
});

meetingRooms.post("/", async (req, res) => {
  const newMeeting = req.body;
  const result = await createMeetingRoom(newMeeting);
  res.json(result);
});

module.exports = meetingRooms;