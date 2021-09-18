const createError = require('http-errors')

module.exports = {
  payment: async (req, res, next) => {
    res.send('You have a total of: 2400$');
  },
};
