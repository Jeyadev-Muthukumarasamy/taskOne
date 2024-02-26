
const express = require("express");
const cors = require("cors");
const router = require("./route/Route");
const dotenv = require("dotenv");
const connectDb = require("./db/db");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDb();
const PORT = 3003;
app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server running on port 3003");
});
