import 'module-alias/register';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import createError from 'http-errors';
import { Errback, Request, Response, NextFunction } from 'express';
require('dotenv').config();

require('./passport');

// import createError from 'http-errors';

// const middlewares = require('./middlewares');
import { verifyAccessToken } from './middleware/verifyAccessToken';
import routes from '@routes/index';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', verifyAccessToken, (req, res) => {
    res.status(200).send({
        message: 'api server running',
    });
});

app.use('/api/v1', routes);

app.use(async (req, res, next) => {
    next(new createError.NotFound());
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});
