// -------------------------------------------------------------------
// Object Name.... questions.js
// Description.... Question Actions
// Developer...... R. Todd Stephens
// Date Written... 3/26/2020
// -------------------------------------------------------------------
import { addQuestion } from "../utils/api";


// Add Question Action Creator
// -------------------------------------------------------------------
export function addQuestionActionCreator(deckTitle, queueAnswer) {
	return function(dispatch) {
		return addQuestion(deckTitle, queueAnswer);
	}
}