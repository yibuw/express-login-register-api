const express = require('express');
// const User = require("../models/user");
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExistsUser = await prisma.user
    .findUnique({
      where: {
        email,
      },
    })
    .catch((err) => {
      console.log('Error: ', err);
    });

  //   await User.findOne({ where: { email } }).catch((err) => {
  //     console.log('Error: ', err);
  //   });

  if (alreadyExistsUser) {
    return res.status(409).json({ message: 'User with email already exists!' });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await prisma.user
    .create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  //   const newUser = new User({ name, email, password });
  //   const savedUser = await newUser.save().catch((err) => {
  //     console.log("Error: ", err);
  //     res.status(500).json({ error: "Cannot register user at the moment!" });
  //   });
  res.status(200).json({ message: 'Thanks for registering' });
  //   if (savedUser) res.json({ message: "Thanks for registering" });
});

module.exports = router;
