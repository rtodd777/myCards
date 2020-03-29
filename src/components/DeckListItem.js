// -------------------------------------------------------------------
// Object Name.... DeckListItem.js
// Description.... Single List Item
// Developer...... R. Todd Stephens
// Date Written... 3/26/2020
// -------------------------------------------------------------------
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// Import Local
import { mid_purple, light_purple, white } from "../utils/colors";

class DeckListItem extends Component {

// Render Code
// -------------------------------------------------------------------
	render() {
		const { deck } = this.props;
		const nbrdecks = deck.questions.length;
		return (
			<View style={styles.card}>
				<Text style={styles.title}>
					{deck.title}
				</Text>
				<Text style={styles.details}>
					{nbrdecks === 1? `${nbrdecks} Card`: `${nbrdecks} Cards`}
				</Text>
			</View>
		);
	}
}

// Create Styles
// -------------------------------------------------------------------
const styles = StyleSheet.create({
	card: {
		backgroundColor: mid_purple,
		marginTop: 10,
		marginRight: 10,
		marginLeft: 10,
		padding: 10,
		borderRadius: 8,
		float: "left",
		color: light_purple
	},
	title: {
		fontNbrDecks: 18,
		fontWeight: "bold",
		marginBottom: 6,
		color: white
	},
	details: {
		fontNbrDecks: 14,
		color: light_purple
	},

});

export default DeckListItem;