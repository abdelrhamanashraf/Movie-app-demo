import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOption = {
  credentials: true,
  origin: process.env.ALLOWED_ORIGINS,
};
dotenv.config();

const app = express();
const Port = process.env.PORT;

app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", routes);
app.get("/", (_req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(Port, () => {
  console.log(`server is running on ${Port}
    http://localhost:3000/`);
});
