import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../../models/user.js";
import { tokenChecker } from "../../middleware/auth.js";

//
dotenv.config();
const userEP = express.Router();
let u;
const secret = process.env.SECRET_TOKEN;
const usermodel = new userModel();
let created;
//

const create = async (req, res, next) => {
  u = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  const usermodel = new userModel(u.firstname, u.lastname, u.email, u.password);
  try {
    created = await usermodel.createUser();
    if (created) {
      const token = jwt.sign({ ...created }, secret);
      res.json({
        message: `success`,
        data: { created, token },
      });
    } else {
      res.status(400).json({
        message: `User with email ${u.email} already exists`,
      });
    }
  } catch (error) {
    next();
  }
};

const loginauth = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await usermodel.logIn(email, password);

    if (user) {
      // Generate JWT with expiration time
      const token = jwt.sign({ user }, secret, { expiresIn: "1h" });
      res
        .cookie("token", token, {
          httponly: true,
          secret: false,
          Domain: undefined,
        })
        //.setHeader('Set-Cookie',token)
        .json({ message: "Success", data: { token } });

      console.log(user);
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const update = async (req, res, next) => {
  try {
    const u = {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };

    // Create a filter object
    const filter = { email: u.email };

    // Update the user using the filter and the new data
    const updating = await usermodel.updateUser(filter, u);

    res.json({
      message: `success`,
      data: { ...updating },
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const email = req.user.user.email; // Assuming the email is stored in req.user.user.email
    const user = await usermodel.getOneUser({ email });
    console.log(user);

    if (user) {
      res.status(200).json({ message: "Success", data: user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
userEP.patch("/patch", tokenChecker, update);
userEP.get("/me", tokenChecker, getUserProfile);
userEP.post("/authenticate", loginauth);
userEP.post("/", create);

export default userEP;
