const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const paginate = require('mongoose-paginate');

const FilmSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    yearOfIssue: {
        type: Date
    },
    format: {
        type: String
    },
    actors: [{ type: String }]
});

FilmSchema.plugin(autoIncrement, {
    inc_field: 'film_id'
});

FilmSchema.plugin(paginate);

module.exports.Film = mongoose.model('Film', FilmSchema);