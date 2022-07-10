const mongoose = require('mongoose');
const connectDatabase = () => {
  mongoose
    .connect(
      'mongodb+srv://Sensale:WebSensale@sensale.cde53.mongodb.net/Sensale?retryWrites=true&w=majority',
      {}
    )
    .then((data) => {
      console.log(`Mongodb connected with server :${data.connection.host}`);
    });
};
module.exports = connectDatabase;
