const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);
const paginate = require('mongoose-paginate-v2');

const FilmSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    yearOfIssue: {
        type: Number,
        min: 1850,
        max: 2025
    },
    format: {
        type: String,
        enum: ['VHS', 'DVD', 'Blu-Ray']
    },
    actors: [{
        type: String,
        validate: {
            validator: (value) => {
                return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value);
            },
            message: props => `Actor name (${props.value}) shouldn\'t contains numbers`
        }
    }]
});

FilmSchema.plugin(autoIncrement, {
    inc_field: 'film_id'
});

FilmSchema.plugin(paginate);

module.exports.Film = mongoose.model('Film', FilmSchema);