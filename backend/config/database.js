const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://mongo_chhotelal:lCiPWAaeNqOnmWJO@sensale.9sbudrz.mongodb.net/sensale_db"
    )
    .then((data) => {
      console.log(`Mongodb connected with server :${data.connection.host}`);
    });
};
module.exports = connectDatabase;
