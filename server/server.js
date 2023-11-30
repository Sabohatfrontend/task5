require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(express.json());
app.use('/api/users', userRoute);
// app.use('/api/admin', adminRoute);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected MongoDb and listen on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    });