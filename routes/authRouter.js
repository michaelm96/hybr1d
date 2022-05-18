const router = require("express").Router();
const { User } = require("../models");
const generateToken = require("../helpers/generateToken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    if (name || email || password || type) {
      return res.status(404).json({
        message: "there are missing fields",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      type,
    });

    const access_token = generateToken(user);
    return res.status(201).json({
      message: "success create user",
      access_token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        message: "Invalid email/password",
      });
    } 
    
    const access_token = generateToken(user);
    return res.status(200).json({ access_token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
