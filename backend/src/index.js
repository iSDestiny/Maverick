require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const adminRoute = require('./routes/admin');
const mainRoute = require('./routes/main');

const app = express();

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.q46pp.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'origin',
            'x-requested-with'
        ],
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE']
    })
);

app.use(mainRoute);
app.use('/admin', adminRoute);

app.use((error, req, res, next) => {
    console.log('This is an error');
    console.log(error.message);
    const status = error.status || 500;
    res.status(status).json({
        message: error.message
    });
});

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        const server = app.listen(process.env.PORT || 8080);
        require('./socket').init(server);
    })
    .catch((err) => {
        console.log(err);
    });
