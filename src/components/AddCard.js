// -------------------------------------------------------------------
// Object Name.... AddCard.js
// Description.... Add a New Card
// Developer...... R. Todd Stephens
// Date Written... 3/27/2020
// -------------------------------------------------------------------
import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Local Imports
import { addQuestionActionCreator } from "../actions/questions";
import { white, purple, light_purple } from "../utils/colors";

class AddCard extends Component {
	state = {
		question: "",
		answer: ""
	};

// Add Question
// -------------------------------------------------------------------
	onAddQuestion = () => {
		if (this.state.question === "" || this.state.answer === "") {
			return
		}
		this.props.addQuestion(this.props.deckTitle, {
			question: this.state.question,
			answer: this.state.answer
		});
		this.setState({
			question: '',
			answer: ''
		})
	};


// Main Render
// -------------------------------------------------------------------
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<MaterialCommunityIcons name="cards-variant" size={120} color={white} />
				<Text style={{ fontSize: 22, margin: 20, color: white, fontWeight: "bold" }}>
					{this.props.deckTitle}
				</Text>
				<TextInput
					value={this.state.question}
					placeholder="Write question here!!"
					onChangeText={question => this.setState({ question })}
					style={styles.input}
				/>
				<TextInput
					value={this.state.answer}
					placeholder="Write answer here!!"
					onChangeText={answer => this.setState({ answer })}
					style={styles.input}
				/>
				<TouchableOpacity style={styles.button} onPress={this.onAddQuestion} >
					<Text style={{ color: white, fontSize: 18 }}>Add</Text>
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
	input: {
		width: 250,
		height: 48,
		margin: 20,
		fontSize: 20,
		color: white,
		borderBottomWidth: 1,
		borderColor: white
	},
	button: {
		height: 42,
		width: 100,
		margin: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: purple,
		borderRadius: 8
	}
});


// Map State to Props
// -------------------------------------------------------------------
function mapStateToProps(state, { navigation }) {
	return {
		deckTitle: navigation.state.params.entryId
	};
}


// Map Dispatch To Props
// -------------------------------------------------------------------
function mapDispatchToProps(dispatch) {
	return {
		addQuestion: (title, queAns) =>
			dispatch(addQuestionActionCreator(title, queAns))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);