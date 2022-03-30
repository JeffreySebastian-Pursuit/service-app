const express = require("express");
const bookings = express.Router();
const {
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
} = require("../queries/bookings");

bookings.get("/", async (req, res) => {
  const bookings = await getAllBookings();
  res.json(bookings);
});

bookings.get("/:id", async (req, res) => {
  const booking = await getBooking(req.params.id);
  if (booking.length) {
    res.json(booking);
  } else {
    res.status(404).json({ success: false, error: true, message: "invalid" });
  }
});

bookings.post("/", async (req, res) => {
  const newBooking = req.body;
  const result = await createBooking(newBooking);

  res.json(result);
});

bookings.delete("/:id", async (req, res) => {
  const booking = await deleteBooking(req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ success: false, error: true, message: "invalid" });
  }
});

module.exports = bookings;
