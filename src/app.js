const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const seedRouter = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseController');
const authRouter = require('./routers/authRouter');
const categoryRouter = require('./routers/categoryRouter');
const productRouter = require('./routers/productRouter');
const homeRouter = require('./routers/home');
const cors = require('cors');

const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute,
    max: 5,
    message: 'Too many request from this IP. Please try again later',
});

const corsConfig = {
    origin: [
        'https://mern-ecommerce-backend-z0p8.onrender.com',
        'http://localhost:5173',
        'https://spark-ecommerce-app.vercel.app',
    ],
};

app.use(cookieParser());
// app.use(rateLimiter);
app.use(morgan('dev'));
app.use(xssClean());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/seed', seedRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/', homeRouter);

app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'api testing is working fine',
    });
});

// client error handling
app.use((req, res, next) => {
    next(createError(404, 'route-not found'));
});

// server error handling -> all the errors
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message,
    });
});

module.exports = app;
