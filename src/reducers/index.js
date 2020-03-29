// -------------------------------------------------------------------
// Object Name.... index.js
// Description.... Main Reducer
// Developer...... R. Todd Stephens
// Date Written... 3/27/2020
// -------------------------------------------------------------------
import { combineReducers } from 'redux';
import { deckReducer } from './decks';

export default combineReducers({
	deckReducer
})