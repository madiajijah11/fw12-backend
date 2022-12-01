const express = require("express");
const routers = require("./src/routes");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

require("dotenv").config();

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.APP_DEBUG === "development") {
  app.use(morgan("dev"));
}

app.use("/assets/uploads", express.static("uploads/"));

app.use(routers);

app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/index.html`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
