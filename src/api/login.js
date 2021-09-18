const express = require('express');
const createError = require('http-errors');
// const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
const { signAccessToken, signRefreshToken } = require('../helpers/jwt_helper');

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userWithEmail = await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch((err) => {
        console.log('Error: ', err);
      });

    if (!userWithEmail) {
      throw createError.NotFound('User not registered');
    }

    if (!(await bcrypt.compare(password, userWithEmail.password))) {
      throw createError.Unauthorized('Username/password not valid');
    }

    //   if (userWithEmail.password !== password) {
    //     return res
    //       .status(400)
    //       .json({ message: 'Email or password does not match!' });
    //   }
    //   const jwtToken = jwt.sign(
    //     { id: userWithEmail.id, email: userWithEmail.email },
    //     process.env.JWT_SECRET,
    //     {
    //       //1 minute
    //       expiresIn: 60,
    //     }
    //   );

    const accessToken = await signAccessToken(email);
    const refreshToken = await signRefreshToken(email);
    res.status(200).send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
