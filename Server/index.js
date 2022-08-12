const express = require("express");
const app = express();
const connectToMongo = require("./db");
connectToMongo();

let port = 5000;
app.listen(port, () => {
  console.log(`example app listening at port ${port}`);
});
app.use(express.json());
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const notesRoutes = require("./routes/notes");
app.use("/api/notes", notesRoutes);
