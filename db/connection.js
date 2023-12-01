const mongoose = require("mongoose");

// @todo - remove this
const uri = "mongodb://0.0.0.0:27017/fake-store" || process.env.DATABASE_URL;

mongoose.connect(uri, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
//options obj allows us to use whatever method we want with mongoose

mongoose.connection.on("connected", () => {
  console.log("mongoose connected!!");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose error ${err}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
