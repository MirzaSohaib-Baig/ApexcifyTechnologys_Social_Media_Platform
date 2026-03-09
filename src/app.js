const express = require("express");
const bodyParser = require("body-parser");
const { connectDB, initDb } = require("./config/database_config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const masterRouter = require("./routes/index");

const bootstrap = async () => {

  await connectDB();
  await initDb();

  // Middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(
    {
      origin: 'http://localhost:5173',
      credentials: true,

    }));

  // Use Master Router
  app.use("/api", masterRouter);


  app.get("/", (req, res) => {
    res.send("Welcome to the Stoxly API");
  });

  // Start the server
  app.listen(8000, () => {
    console.log("Server is running on port", 8000);
  });

};

bootstrap();