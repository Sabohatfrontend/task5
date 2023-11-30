require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(procces.env.MONGO_URL)
.then(() => {
    app.listen(4000,() =>{
        console.log('Connected MongoDb and listen on port 4000');
    })
})
.catch((err) => {
    console.log(err);
});