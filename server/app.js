const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const CORS = require("cors");

mongoose.connect(
  "mongodb://LAKSHITgoel:lakshit123@ds161459.mlab.com:61459/graphql"
);
mongoose.connection.once("open", () => console.log("connected to database"));

app.use(CORS());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("Server is Listening on localhost:4000"));
