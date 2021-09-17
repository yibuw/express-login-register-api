const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
// const User = require("../models/user");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      prisma.user
        .findUnique({
          where: {
            id: jwtPayload.id,
          },
        })
        .then(
          (user) => {
            return done(null, user);
          },
          (reason) => {
            return done(reason);
          }
        );

      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
