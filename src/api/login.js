const express = require('express');
// const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await prisma.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
  //   const userWithEmail = await User.findOne({ where: { email } }).catch(
  //     (err) => {
  //       console.log('Error: ', err);
  //     }
  //   );

  if (!userWithEmail) {
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });
  }

  if (!(await bcrypt.compare(password, userWithEmail.password))) {
    console.log('password correct');
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });
  }

  //   if (userWithEmail.password !== password) {
  //     return res
  //       .status(400)
  //       .json({ message: 'Email or password does not match!' });
  //   }
  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET,
    { expiresIn: 60 }
  );

  res.json({ message: 'Welcome Back!', token: jwtToken });
});

module.exports = router;
