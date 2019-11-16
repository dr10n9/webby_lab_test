const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');


const config = require('./config');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/api', routes.Api);
app.use('/films', routes.Film);

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
});
