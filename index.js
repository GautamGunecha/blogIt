require("dotenv").config();
const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const colors = require("colors");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // 100 requests per IP
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
app.use(limiter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port:${port}`.blue));
