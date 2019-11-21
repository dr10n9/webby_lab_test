const hash = require('object-hash');


module.exports.sortActors = function(actors) {
    return actors.map(el => {
        return {
            name: el,
            lowerName: el.toLowerCase()
        }
    }).sort(compare).map(el => el.name);
    
}

function compare(a, b) {
    if(a.lowerName < b.lowerName) return -1;
    if(a.lowerName > b.lowerName) return 1;
    return 0;
}

module.exports.compareFilms = function(film_a, film_b) {
    film_a.actors = sortActors(film_a.actors);
    film_b.actors = sortActors(film_b.actors);
    return hash(film_a) === hash(film_b);
}