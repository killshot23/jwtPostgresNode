const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/model");
// const { INITIALLY_DEFERRED } = require("sequelize/types/deferrable");
const Role = db.role;
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.use(bodyparser.json()); // to parse content of type JSON
app.use(bodyparser.urlencoded({ extended: true })); // to parse content of type form url-encoded

app.get("/", (req, res) => {
  res.json({ message: "this is the simple login application" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync db");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
