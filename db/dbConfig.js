const conn = require("knex")({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./studyroom_viren.db",
  },
});

const generateRoomData = (count = 99) => {
  let i = 0;
  const data = [];
  while (i < count) {
    const length = 3;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXY";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    data.push({
      room_number: String(result + "00" + i).trim(),
      morning_available: null,
      afternoon_available: null,
      evening_available: null,
    });
    i++;
  }
  console.log("data", data);
  return data;
};

const getStudentData = () => {
  const data = require("./students.json");
  return data;
};

/** students */
conn.schema.hasTable("students").then(function (exists) {
  if (!exists) {
    conn.schema
      .createTable("students", function (table) {
        table.increments();
        table.string("student_username");
        table.string("first_name");
        table.string("last_name");
        table.timestamps();
      })
      .catch((err) => console.log("errrrr", err));
    console.log("initiating students data..........");
    conn
      .insert(getStudentData())
      .into("students")
      .then((res) => console.log(res));
    console.log("......done");
  }
});
/** rooms */
conn.schema.hasTable("rooms").then(function (exists) {
  if (!exists) {
    conn.schema
      .createTable("rooms", function (table) {
        table.increments();
        table.string("room_number");
        table.string("morning_available");
        table.string("afternoon_available");
        table.string("evening_available");
        table.timestamps();
      })
      .catch((err) => console.log("errrrr", err));
    console.log("initiating rooms data..........");
    generateRoomData().forEach((room) =>
      conn
        .insert(room)
        .into("rooms")
        .catch((error) => console.log("error", error))
    );
    console.log("......done");
  }
});

module.exports = conn;
