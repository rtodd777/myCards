// -------------------------------------------------------------------
// Object Name.... DeckList.js
// Description.... List of the Decks
// Developer...... R. Todd Stephens
// Date Written... 3/26/2020
// -------------------------------------------------------------------
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import _ from "lodash";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from "react-redux";

// Local Imports
import { getAllDecksActionCreator, getDeckActionCreator, createDeckActionCreator } from "../actions/decks";
import DeckListItem from "./DeckListItem";
import { light_purple, purple, white } from "../utils/colors";


class DeckList extends Component {
	state = {
		decks: {}
	};

	componentDidMount() {
		this.props.navigation.addListener('willFocus', this._getData);
	}

	_getData = () => {
		this.props
			.getAllDecks()
			.then(() => this.setState({ decks: this.props.decks }));
	}


// Rendor Display
// -------------------------------------------------------------------
	render() {
		const { decks } = this.state;
		if (_.isEmpty(decks)) {
			return (
				<View style={styles.container}>
					<MaterialCommunityIcons name="cards-variant" size={120} color={white} />
					<Text style={styles.text}>Sorry, No Decks Available.</Text>
					<Text style={styles.text2}>Start by adding a new deck.</Text>
				</View>
			);
		}
		return (
			<ScrollView style={styles.list}>
				{Object.keys(decks).map(deckTitle => (
					<TouchableOpacity
						key={deckTitle}
						onPress={() =>
							this.props.navigation.navigate("DeckDetail", {
								entryId: deckTitle
							})}
					>
						<DeckListItem deck={decks[deckTitle]} />
					</TouchableOpacity>
				))}
				<View style={{height: 10}}></View>
			</ScrollView>
		);
	}
}


// Styles
// -------------------------------------------------------------------
const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontSize: 24,
		color: white,
		backgroundColor: light_purple,
		alignItems: "center",
		justifyContent: "center"
	},
	list: {
		backgroundColor: light_purple,
		height: "100%"
	},
  	text: {
    		color: white,
    		fontSize: 24
  	},	
  	text2: {
    		color: white,
    		fontSize: 16
  	}	
});


// Map State to Props
// -------------------------------------------------------------------
function mapStateToProps({ deckReducer }) {
	return {
		decks: deckReducer,
		deck: deckReducer
	};
}


// Map Dispatch to Props
// -------------------------------------------------------------------
function mapDispatchToProps(dispatch) {
	return {
		getAllDecks: () => dispatch(getAllDecksActionCreator()),
		getDeck: title => dispatch(getDeckActionCreator(title))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
