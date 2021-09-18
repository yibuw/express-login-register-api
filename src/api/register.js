const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log('Error: ', err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: 'User with email already exists!' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const savedUser = prisma.user
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

  if (savedUser) res.json({ message: 'Thanks for registering' });
});

module.exports = router;
