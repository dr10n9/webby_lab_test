const initialState = {
    films: []
};

export function filmsListReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_FILMS':
            return { ...state, films: action.payload };
        case 'ADD_FILMS':
            return { ...state, films: state.films.concat(action.payload) };
        case 'CLEAR_FILMS':
            return { ...state, films: [] }
        default:
            return state;
    }
};