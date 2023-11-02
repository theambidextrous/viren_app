const express = require("express");
const router = express.Router();
const rooms = require("../controller/rooms");

router.get("/", (req, res) => {
  if (req.session.bookingsData) {
    const { bookingsData } = req.session;
    res.render("homepage", { data: bookingsData });
  } else {
    req.session.bookingsData = rooms.getRooms();
    res.render("homepage", { data: req.session.bookingsData });
  }
});

router.get("/reserve-room/:roomId", (req, res) => {
  const { bookingsData } = req.session;
  const room = rooms.getRoom(bookingsData, Number(req.params.roomId));
  const users = rooms.getUsers();
  const slots = [
    { key: "morning_available", value: "Morning" },
    { key: "afternoon_available", value: "Afternoon" },
    { key: "evening_available", value: "Evening" },
  ];
  res.render("reserve", { roomNumber: room.room_number, users, slots });
});

router.post("/reserve-room", (req, res) => {
  const { username, roomNumber, slot } = req.body;
  const { bookingsData } = req.session;
  const updatedList = rooms.reserveRoom(
    bookingsData,
    roomNumber,
    username,
    slot
  );
  req.session.bookingsData = updatedList;
  req.session.save();
  res.redirect("/");
});

router.get("/clear-all-reservations", (req, res) => {
  const { bookingsData } = req.session;
  const clearedRooms = rooms.clearRoomReservations(bookingsData);
  req.session.bookingsData = clearedRooms;
  req.session.save();
  res.redirect("/");
});

module.exports = router;
