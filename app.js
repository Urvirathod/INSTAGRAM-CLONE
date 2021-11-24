const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const cors = require("cors");

const app = express();
app.use(cors());
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (!err) {
      console.log("DB connected");
    }
  }
);

app.use(express.json());

require("./models/user");
require("./models/post");
app.use(require("./routes/userRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("insta-clone/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "insta-clone ", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
