const express = require('express');
// const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { signAccessToken, signRefreshToken } = require('../helpers/jwt_helper');
const prisma = new PrismaClient();

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

  //   const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
  //     (err) => {
  //       console.log('Error: ', err);
  //     }
  //   );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: 'User with email already exists!' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const savedUser = await prisma.user
    .create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    .catch((err) => {
      console.log('Error', err);
      res.status(500).json({ error: 'Cannot register user at the moment!' });
    });

  //   const newUser = new User({ name, email, password: hashedPassword });
  //   const savedUser = await newUser.save().catch((err) => {
  //     console.log('Error: ', err);
  //     res.status(500).json({ error: 'Cannot register user at the moment!' });
  //   });
  const accessToken = await signAccessToken(email);
  const refreshToken = await signRefreshToken(email);
  if (savedUser)
    res
      .status(200)
      .send({ message: 'Thanks for registering', accessToken, refreshToken });
  //   res.json({ message: 'Thanks for registering' });
});

module.exports = router;
