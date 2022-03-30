const db = require("../db/dbConfig.js");

const getAllMeetingRooms = async () => {
  return await db.any("SELECT * FROM meetingRoom");
};

const getMeetingRoom = async (id) => {
  return await db.oneOrNone("SELECT * FROM meetingRoom WHERE id=$1", id);
};
const getAllFutureBookingsOfMeetingRoom = async (id) => {
  return await db.any(
    "select meetingRoom.name as name, meetingRoom.capacity as capcity, meetingRoom.floor as floor, booking.meetingName, booking.startdate, booking.enddate, booking.attendees from meetingRoom join booking on  booking.meetingroomid = meetingRoom.id where meetingRoom.id = $1",
    id
  );
};
const createMeetingRoom = async (newMeeting) => {
  const { name, capacity, floor } = newMeeting;
  return await db.one(
    "INSERT INTO meetingRoom(name, capacity, floor) VALUES($1, $2, $3) RETURNING *",
    [name, capacity, floor]
  );
};

module.exports = {
  getAllMeetingRooms,
  getMeetingRoom,
  createMeetingRoom,
  getAllFutureBookingsOfMeetingRoom
};
