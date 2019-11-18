export function addFilms(films) {
    return {
        type: 'ADD_FILMS',
        payload: films
    }
}

export function setFilms(films) {
    return {
        type: 'SET_FILMS',
        payload: films
    }
}

export function clearFilms() {
    return {
        type: 'CLEAR_FILMS'
    }
}