import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {registerValidator} from './validations/auth.js'
import {validationResult} from 'express-validator'
import UserModel from './models/User.js'


mongoose
  .connect(
      "mongodb+srv://admin:F8yTA45fBDOk4u34@cluster1.hawq0zk.mongodb.net/blog?retryWrites=true&w=majority",
  )
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB ERROR', err));

const app = express();
app.use(express.json());

app.post("/auth/register", registerValidator, async (req, res) => {
  const err = validationResult(req);
  if(!err.isEmpty()) {
    return res.status(400).json(err.array());
  }
  const salt = await bcrypt.genSalt(10);
  const isHashedPass = await bcrypt.hash(req.body.passwordHash, salt);

  const _doc = new UserModel({
    fullName: req.body.fullName,
    email: req.body.email,
    passwordHash: isHashedPass,
    avatarUrl: req.body.avatarUrl,
  });
  const user = await _doc.save();
  res.json(user);
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server Ok");
});

