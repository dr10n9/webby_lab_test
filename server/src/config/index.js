require('dotenv').config();
const comparators = require('./compareFilms');
module.exports = {
    PORT: process.env.PORT,
    DATABASE_URI: process.env.DATABASE_URI,
    PAGINATION_LIMIT: parseInt(process.env.PAGINATION_LIMIT),
    parseBoolean: function(value) {
        return value == "true" ? true : false;
    },
    compareFilms: comparators.compareFilms,
    sortActors: comparators.sortActors
};
