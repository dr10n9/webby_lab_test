require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DATABASE_URI: process.env.DATABASE_URI,
    PAGINATION_LIMIT: parseInt(process.env.PAGINATION_LIMIT)
}
