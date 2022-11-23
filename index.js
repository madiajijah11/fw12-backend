const express = require("express");
const routers = require("./src/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routers);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
