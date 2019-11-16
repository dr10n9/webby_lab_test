const express = require('express');
const app = express();
const mongoose = require('mongoose');

const config = require('./config');



app.listen(config.PORT, async (err) => {
    if(err) console.log(err);
    else {
        console.log(`listening on ${config.PORT}`);
        try {
            let connection = mongoose.connect(config.DATABASE_URI, {
                useNewUrlParser: true
            });
            console.log('connected');
        } catch (error) {  
            console.log(error);
        }
    }
})
