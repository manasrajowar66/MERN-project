const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 5000;
//connecte to the Db server
connectDB();
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

//serve static asset in production

if (process.env.NODE_ENV === "production") {
  //serve static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
