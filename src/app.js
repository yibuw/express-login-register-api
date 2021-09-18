const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
require('./auth/passport');

const createError = require('http-errors');

// require("./models/user");

// const middlewares = require('./middlewares');
// const api = require('./api');
const routes = require('./routes/index')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'api server running',
  });
});

app.use('/api/v1', routes);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
