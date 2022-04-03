const express = require("express");
const meetingRooms = express.Router();
const {
  getAllMeetingRooms,
  getMeetingRoom,
  createMeetingRoom,
  getAllFutureBookingsOfMeetingRoom,
  availableRooms,
} = require("../queries/meetingRoom");

/* GET home page. */
meetingRooms.get("/", async (req, res) => {
  const meetingRooms = await getAllMeetingRooms();
  res.json(meetingRooms);
});
meetingRooms.get("/available", async (req, res) => {
  return res.json(await availableRooms());
});

meetingRooms.get("/:id", async (req, res) => {
  const meetingRoom = await getMeetingRoom(req.params.id);
  if (meetingRoom) {
    res.json(meetingRoom);
  } else {
    res.status(404).json({ success: false, error: true, message: "invalid" });
  }
});
meetingRooms.get("/:id/bookings", async (req, res) => {
  const roomBookings = await getAllFutureBookingsOfMeetingRoom(req.params.id);
  if (roomBookings.length) {
    res.json(roomBookings);
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
