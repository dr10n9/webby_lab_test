import { combineReducers } from 'redux';
import { currentFilmReducer } from './currentFilm';
import { filmsListReducer } from './filmsList';

export const rootReducer = combineReducers({
    currentFilm: currentFilmReducer,
    filmsList: filmsListReducer
});