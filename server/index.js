const express = require("express");
const cors = require("cors");

const app = express();

const usersRoute = require("./route/usersRoute");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/users", usersRoute);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
