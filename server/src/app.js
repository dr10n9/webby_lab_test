const express = require('express');
const app = express();

const config = require('./config');



app.listen(config.PORT, (err) => {
    if(err) console.log(err);
    else {
        console.log(`listening on ${config.PORT}`);
        // TODO mongoose connection;
    }
})
