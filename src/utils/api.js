// -------------------------------------------------------------------
// Object Name.... api.js
// Description.... API Utilities
// Developer...... R. Todd Stephens
// Date Written... 3/26/2020
// -------------------------------------------------------------------
import { AsyncStorage } from "react-native";
import { resetApp } from "../utils/colors";

const STORAGE_KEY = "@mycards:decks";


// Get All Decks
// -------------------------------------------------------------------
export async function getAllDecks() {
	if (resetApp) {
		AsyncStorage.clear();
	}
	let data = await AsyncStorage.getItem(STORAGE_KEY);
	let decks = JSON.parse(data);
	return decks || {};
}


// Get Single Decks
// -------------------------------------------------------------------
export async function getDeck(deckTitle) {
	const decks = await getAllDecks();
	return decks[deckTitle] || {};
}


// Create a Deck
// -------------------------------------------------------------------
export async function createDeck(deckTitle) {
	const deck = {
		[deckTitle]: {
			title: deckTitle,
			questions: []
		}
	};
	return await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
}


// Add Question
// -------------------------------------------------------------------
export async function addQuestion(deckTitle, queAns) {
	let decks =  await getAllDecks();
	if(decks[deckTitle]){
		decks[deckTitle].questions.push(queAns)
		return await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));	
	} else {
		console.log("error");
	}
	
}
