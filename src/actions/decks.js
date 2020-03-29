// -------------------------------------------------------------------
// Object Name.... decks.js
// Description.... Deck Actions
// Developer...... R. Todd Stephens
// Date Written... 3/26/2020
// -------------------------------------------------------------------
import { createDeck, getAllDecks, getDeck } from "../utils/api";

// Actions Codes
export const GET_ALL_DECKS = "GET_ALL_DECKS";
export const GET_DECK = "GET_DECK";


// Get All Decks Action
// -------------------------------------------------------------------
export function getAllDecksAction(decks) {
	return {
		type: GET_ALL_DECKS,
		payload: decks
	};
}


// Get All Decks Action Creator
// -------------------------------------------------------------------
export function getAllDecksActionCreator() {
	return function(dispatch) {
		return getAllDecks().then(decks => {
			dispatch(getAllDecksAction(decks));
		});
	};
}


// Get Deck Action
// -------------------------------------------------------------------
export function getDeckAction(deck) {
	return {
		type: GET_DECK,
		payload: deck
	};
}


// Get Deck Action Creator
// -------------------------------------------------------------------
export function getDeckActionCreator(title) {
	return function(dispatch) {
		return getDeck(title).then(deck => {
			dispatch(getDeckAction(deck))
		});
	};
}


// Create Deck Action Creator
// -------------------------------------------------------------------
export function createDeckActionCreator(title) {
	return function(dispatch) {
		return createDeck(title);
	};
}
