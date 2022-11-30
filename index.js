const express = require("express");
const routers = require("./src/routes");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/assets/uploads", express.static("uploads/"));

app.use(routers);

app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/index.html`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
