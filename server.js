//initializes
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const schema = require("./graphql/Schema");
const { resolvers, DateResolver } = require("./graphql/Resolvers");
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);
require("./db/connection");

//app
const app = express();

//port
const port = process.env.PORT || 6400;

//routes
const productRoute = require("./routes/product");
const homeRoute = require("./routes/home");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

//middleware
app.use(cors());

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  "/graphiql",
  graphqlHTTP({
    schema,
    rootValue: {
      Date: DateResolver,
      ...resolvers,
    },
    graphiql: true,
  })
);

//view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.disable("view cache");

app.use("/", homeRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

app.listen(() => {
  console.log(`listening on port: localhost:${port}`);
});

module.exports = app;
