import express from "express";
import userEP from "./controllers/userHndeler.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("hello world");
});

routes.use("/users", userEP);

//
export default routes;
