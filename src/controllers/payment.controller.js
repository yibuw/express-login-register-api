const createError = require('http-errors');

module.exports = {
  payment: async (req, res, next) => {
    res.status(200).send('You have a total of: 2400$');
  },
};
