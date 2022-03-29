const db = require("../db/dbConfig.js");

const getAllMeetingRooms = async () => {
  return await db.any("SELECT * FROM meetingRoom");
};

const getMeetingRoom = async (id) => {
  return await db.oneOrNone("SELECT * FROM meetingRoom WHERE id=$1", id);
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
  createMeetingRoom
};
