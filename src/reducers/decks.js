// -------------------------------------------------------------------
// Object Name.... decks.js
// Description.... Deck reducer
// Developer...... R. Todd Stephens
// Date Written... 3/27/2020
// -------------------------------------------------------------------
import { GET_ALL_DECKS, GET_DECK } from '../actions/decks';

export function deckReducer(state={}, action) {
	switch(action.type) {
		case GET_ALL_DECKS: return action.payload;
		case GET_DECK: return action.payload
		default: return state;
	}
}