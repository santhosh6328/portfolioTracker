const express = require("express");
const trade = require("./routes/trade");
const portfolio = require("./routes/portifolio");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// const { MongoClient } = require("mongodb");
const uri = process.env.URI;

require("dotenv").config();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello from simple portfolio tracker APIs. To know more : https://github.com/santhosh6328/portfolioTracker :)");
});

app.use("/trade", trade);
app.use("/portfolio", portfolio);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to ${uri}...`);
    app.listen(port, () =>
      console.log("> Server is up and running on port : " + port)
    );
  })
  .catch((err) => console.log(err));
