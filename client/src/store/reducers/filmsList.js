const initialState = {
    films: [],
    page: 0,
    pages: 0
};

export function filmsListReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FILMS':
            return { ...state, films: action.payload };
        case 'ADD_FILMS':
            return { ...state, films: state.films.concat(action.payload) };
        case 'CLEAR_FILMS':
            return { ...state, films: [] };
        case 'SET_PAGE':
            return { ...state, page: action.payload };
        case 'SET_PAGES':
            return { ...state, pages: action.payload };
        
        default:
            return state;
    }
};