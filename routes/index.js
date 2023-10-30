const express = require("express");
const router = express.Router();
const rooms = require("../db/rooms");

router.get("/", async (req, res) => {
  const allRooms = await rooms.getRooms();
  res.render("homepage", { data: allRooms });
});

router.get("/reserve-room/:roomId", async (req, res) => {
  const room = await rooms.getRoom(req.params.roomId);
  const users = await rooms.getUsers();
  const slots = [
    { key: "morning_available", value: "Morning" },
    { key: "afternoon_available", value: "Afternoon" },
    { key: "evening_available", value: "Evening" },
  ];
  const roomInfo = room[0];
  res.render("reserve", { roomNumber: roomInfo.room_number, users, slots });
});

router.post("/reserve-room", async (req, res) => {
  const { username, roomNumber, slot } = req.body;
  await rooms.reserveRoom(roomNumber, username, slot);
  res.redirect("/");
});

router.get("/clear-all-reservations", async (req, res) => {
  await rooms.clearRoomReservations();
  res.redirect("/");
});

module.exports = router;
