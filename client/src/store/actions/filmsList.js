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

export function setPage(page) {
    return {
        type: 'SET_PAGE',
        payload: page
    }
}

export function setPages(pages) {
    return {
        type: 'SET_PAGES',
        payload: pages
    }
}