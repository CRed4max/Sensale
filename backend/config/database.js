const mongoose = require("mongoose");
const connectDatabase = async () => {
  const connect = await mongoose
    .connect(
      "mongodb+srv://mongo_chhotelal:lCiPWAaeNqOnmWJO@sensale.9sbudrz.mongodb.net/sensale_db"
    )
    console.log(`Mongodb connected with server :${connect.connection.host}`);
    return connect;
};
module.exports = connectDatabase;
