const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
//take socketId and userId
const ConnectDB = require("./utils/ConnectDb");
require("dotenv").config();
app.use(require("morgan")("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.options((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-REquested-with,Authorization"
  );
  res.header("Access-Control-Allow-Origin", "PUT,POST,PATCH,DELETE,GET");
  res.status(200).json({});
});

app.use("/api/user", require("./routes/user"));
app.use("/api/car", require("./routes/car"));

ConnectDB()
  .then((res) => {
    console.log("Connection to MongoDB");
    server.listen(3080, () => console.log(`the Server Started at 3080`));
  })
  .catch((error) => console.log(error.message));
