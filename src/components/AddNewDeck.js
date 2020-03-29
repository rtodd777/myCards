// -------------------------------------------------------------------
// Object Name.... AddNewDeck.js
// Description.... Add a New Card
// Developer...... R. Todd Stephens
// Date Written... 3/27/2020
// -------------------------------------------------------------------
import React, { Component } from "react";
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

// Local Imports
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { white, purple, light_purple } from "../utils/colors";
import { createDeckActionCreator } from '../actions/decks';

class AddNewDeck extends Component {
	state = {
		title: ""
	};


// Add New Deck
// -------------------------------------------------------------------
	onPress = () => {
		if(this.state.title === '') {
			return;
		}
		this.props.createDeck(this.state.title);
		this.props.navigation.navigate("DeckDetail", { entryId: this.state.title });
		this.setState({
			title: ''
		})
	}


// Main Render
// -------------------------------------------------------------------
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				
				<MaterialCommunityIcons name="cards-variant" size={100} color={white} />

				<Text style={styles.question}>
					What is the title of your deck?
				</Text>
				
				<TextInput
					value={this.state.title}
					placeholder="Write title here!!"
					onChangeText={title => this.setState({ title })}
					style={styles.input}
				/>

				<TouchableOpacity style={styles.button} onPress={this.onPress} >
					<Text style={{color: white, fontSize: 18}}>Create</Text>
				</TouchableOpacity>

			</KeyboardAvoidingView>
		);
	}
}


// Create Styles
// -------------------------------------------------------------------
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: light_purple,
		alignItems: "center",
		justifyContent: "center"
	},
	question: {
		fontSize: 22,
		color: white,
		marginTop: 20
	},
	input: {
		width: 250,
		height: 48,
		margin: 40,
		fontSize: 20,
		borderBottomWidth: 1,
		borderColor: white
	},
	button: {
		height: 42,
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: purple,
		borderRadius: 8
	}
});


// Map Dispatch To Props
// -------------------------------------------------------------------
function mapDispatchToProps(dispatch) {
	return {
		createDeck: title => dispatch(createDeckActionCreator(title))
	}
}

export default connect(null, mapDispatchToProps)(AddNewDeck);