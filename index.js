require("dotenv").config();
const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const colors = require("colors");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/error");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(limiter);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// api endpoints.
app.get("/", (req, res) => res.render("index"));
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/users"));

// errorHandler.
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`server running on: http://localhost:${port}`.brightBlue)
);
