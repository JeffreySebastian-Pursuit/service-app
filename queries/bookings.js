const db = require("../db/dbConfig.js");

const getAllBookings = async () => {
  return await db.any("select bookings.id as id, meetingRoom.name as name, meetingRoom.capacity as capcity, meetingRoom.floor as floor, bookings.meeting_name, bookings.start_date, bookings.end_date, bookings.attendees from meetingRoom join bookings on  bookings.meetingroom_id = meetingRoom.id;");
};

const createBooking = async (newBook) => {
  const { start_date, end_date, meeting_name, attendees, meetingroom_id } =
    newBook;
  try {
    const booking = await db.one(
      "INSERT INTO bookings (start_date, end_date, meeting_name, attendees, meetingRoom_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [start_date, end_date, meeting_name, attendees, meetingroom_id]
    );
    return booking;
  } catch (error) {
    return { succes: false, message: error };
  }
};
const getBooking = async (id) => {
  return await db.any("select meetingRoom.name as name, meetingRoom.capacity as capcity, meetingRoom.floor as floor, bookings.meeting_name, bookings.start_date, bookings.end_date, bookings.attendees from meetingRoom join bookings on  bookings.meetingroom_id = meetingRoom.id where bookings.id=$1", id);
};


const deleteBooking = async (id) => {
  return await db.oneOrNone("DELETE FROM bookings WHERE id=$1 RETURNING *", id);
};
module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
};
