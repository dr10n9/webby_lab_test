const initialState = {
    id: null,
    name: '',
    actors: [],
    format: '',
    yearOfIssue: null
};

export function currentFilmReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_YEAR':
            return { ...state, yearOfIssue: action.payload };
        case 'SET_FORMAT':
            return { ...state, format: action.payload };
        case 'SET_ACTORS':
            return { ...state, actors: action.payload };
        case 'SET_ID':
            return { ...state, id: action.payload };
        default:
            return state;

    }
};