const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const users = require("./routes/users");
const dishes = require("./routes/dishes");
const orders = require("./routes/orders");

//Creating the server
const app = express();
//Using cors to get rid off cross origin issues (ONLY FOR DEVELOPMENT)
app.use(cors());

//Adding middleware to acquire request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Connecting the database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e));

//Routes for the server
app.use("/api/users", users);
app.use("/api/dishes", dishes);
app.use("/api/orders", orders);

//server routes in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
