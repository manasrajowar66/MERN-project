const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = process.env.PORT || 5000;
//connecte to the Db server
connectDB();
app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("App running....");
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
