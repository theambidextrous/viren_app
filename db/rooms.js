const connection = require("./dbConfig");

const getRooms = () => connection.select("*").from("rooms");
const getRoom = (id) => connection.select("*").from("rooms").where("id", id);
const getUsers = () => connection.select("*").from("students");
const createRoom = (room) => connection.insert(room).into("rooms");
const reserveRoom = (roomNumber, username, slot) => {
  if (
    roomNumber === undefined ||
    username === undefined ||
    slot === undefined
  ) {
    throw new Error("all parameters are required");
  }
  if (roomNumber === "" || username === "" || slot === "") {
    throw new Error("all parameters are required");
  }

  if (roomNumber === null) {
    throw new Error("Room Id parameter is required");
  }

  switch (slot) {
    case "morning_available":
      return connection("rooms")
        .where("room_number", roomNumber)
        .update({ morning_available: username });

    case "afternoon_available":
      return connection("rooms")
        .where("room_number", roomNumber)
        .update({ afternoon_available: username });

    case "evening_available":
      return connection("rooms")
        .where("room_number", roomNumber)
        .update({ evening_available: username });

    default:
      return;
  }
};

const clearRoomReservations = () =>
  connection("rooms").update({
    morning_available: null,
    afternoon_available: null,
    evening_available: null,
  });

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  reserveRoom,
  clearRoomReservations,
  getUsers,
};
