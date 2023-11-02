const initialRoomsState = require("./roomsList");
const studentsList = require("./studentsList");

const getRooms = () => initialRoomsState;
const getRoom = (roomsList, id) => roomsList.find((r) => r.id === id);
const getUsers = () => studentsList;
const createRoom = (roomsList, room) => [...roomsList, room];
const reserveRoom = (roomsList, roomNumber, username, slot) => {
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
      var room = roomsList.find((r) => r.room_number === roomNumber);
      room = {
        ...room,
        bookings: [username, room.bookings[1], room.bookings[2]],
      };
      return roomsList.map((rm) => (rm.room_number === roomNumber ? room : rm));

    case "afternoon_available":
      var room = roomsList.find((r) => r.room_number === roomNumber);
      room = {
        ...room,
        bookings: [room.bookings[0], username, room.bookings[2]],
      };
      return roomsList.map((rm) => (rm.room_number === roomNumber ? room : rm));

    case "evening_available":
      var room = roomsList.find((r) => r.room_number === roomNumber);
      room = {
        ...room,
        bookings: [room.bookings[0], room.bookings[1], username],
      };
      return roomsList.map((rm) => (rm.room_number === roomNumber ? room : rm));

    default:
      return roomsList;
  }
};

const clearRoomReservations = (roomsList) =>
  roomsList.map((rm) => ({ ...rm, bookings: ["", "", ""] }));

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  reserveRoom,
  clearRoomReservations,
  getUsers,
};
