const express = require("express");
const app = express();
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const CORS = require("cors");
const PORT = process.env.PORT || 4000;

mongoose.connect(
  "mongodb://LAKSHITgoel:lakshit123@ds161459.mlab.com:61459/graphql"
);
mongoose.connection.once("open", () => console.log("connected to database"));

app.use(CORS());
app.use(express.static("build"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  res.status(200).sendFile("index.html");
});

app.listen(PORT, () => console.log(`Server is Listening on PORT:${PORT}`));
