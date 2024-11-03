import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.SECRET_TOKEN;

export const tokenChecker = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const bearer = authHeader.split(" ")[0].toLowerCase();
      const token = authHeader.split(" ")[1];
      if (token && bearer === "bearer") {
        const decoded = jwt.verify(token, secret);
        if (decoded) {
          req.user = decoded;

          next();
        } else {
          res.status(401).json({ message: "Failed to authenticate" });
        }
      } else {
        res.status(402).json({ message: "Failed to authenticate" });
      }
    } else {
      res.status(403).json({ message: "Failed to authenticate" });
    }
  } catch (error) {
    res.status(404).json({ message: "Failed to authenticate" });
  }
};
