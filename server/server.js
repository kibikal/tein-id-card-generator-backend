const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const moment = require("moment")

const cors = require("cors");

const app = express();
dotenv.config();
console.log(moment("2023-03-18T00:00:00.000Z").utc().format('DD/MM/YYYY'));
require("./models/registerModels");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true })
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(err);
  });


app.use(express.json());
app.use(cors({
  origin: "*"
}));
app.use("/", routesUrls);



app.listen(process.env.PORT || 4000, () =>
  console.log("Server is running on port 4000")
);
