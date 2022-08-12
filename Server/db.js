const mongoose = require("mongoose");
const db__link = "mongodb://localhost:27017/eNoteBook";

const connectToMongo = () => {
  mongoose.connect(db__link, () => {
    console.log("db connected");
  });
};

module.exports = connectToMongo;
