const db = require("../db/dbConfig.js");

const getAllMeetingRooms = async () => {
  return await db.any("SELECT * FROM meetingRoom");
};

const getMeetingRoom = async (id) => {
  return await db.oneOrNone("SELECT * FROM meetingRoom WHERE id=$1", id);
};
const getAllFutureBookingsOfMeetingRoom = async (id) => {
  return await db.any(
    "select meetingRoom.name as name, meetingRoom.capacity as capcity, meetingRoom.floor as floor, bookings.meeting_name, bookings.start_date, bookings.end_date, bookings.attendees from meetingRoom join bookings on  bookings.meetingroom_id = meetingRoom.id where meetingRoom.id =$1",
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

const availableRooms = async () => {
  return await db.any(
    "select meetingRoom.id as roomId, meetingRoom.floor as floor, meetingRoom.capacity as capacity, bookings.start_date as start, bookings.end_date as end_date from meetingRoom Join bookings on bookings.meetingroom_id = meetingRoom.id;"
  );
};

module.exports = {
  getAllMeetingRooms,
  getMeetingRoom,
  createMeetingRoom,
  getAllFutureBookingsOfMeetingRoom,
  availableRooms,
};
