const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./config');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api', routes.Api);
if(process.env.NODE_ENV !== "TEST") {
    app.listen(config.PORT, async (err) => {
        if(err) console.log(err);
        else {
            console.log(`listening on ${config.PORT}`);
            try {
                let connection = mongoose.connect(config.DATABASE_URI, {
                    useNewUrlParser: true,
                    useFindAndModify: true,
                    useUnifiedTopology: true
                }, (err) => {
                    if(err) console.log(err);
                    else app.emit('app started');
                });
                console.log('connected');
            } catch (error) {  
                console.log(error);
            }
        }
    });
}



app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'build/index.html'));
});

module.exports = {
    app
};