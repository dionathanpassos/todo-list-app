const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectToDb = () => {
  mongoose.connect(
      process.env.DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Mongo DB connectado");
    })
    .catch((err) => console.log(err));
};

module.exports = connectToDb;
