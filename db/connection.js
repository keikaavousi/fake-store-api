const mongoose = require("mongoose");

//mongoose
// mongoose.set("useFindAndModify", false);
// mongoose.set("useUnifiedTopology", true);
// mongoose
//   .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//   .then(() => {
//     app.listen(port, () => {
//       console.log("connect");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

mongoose.connect(process.env.DATABASE_URL, {
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
