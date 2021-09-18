const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return (
        prisma.user
          .findUnique({
            where: {
              email_norm: jwtPayload.aud,
            },
          })
          //   return User.findOne({ where: { id: jwtPayload.id } })
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          })
      );
    }
  )
);
