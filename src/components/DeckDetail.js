// -------------------------------------------------------------------
// Object Name.... DeckList.js
// Description.... List of the Decks
// Developer...... R. Todd Stephens
// Date Written... 3/26/2020
// -------------------------------------------------------------------
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from "react-native";

// Local Imports
import { getDeckActionCreator } from "../actions/decks";
import { white, purple, light_purple, sendNotifications } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { MaterialCommunityIcons } from '@expo/vector-icons';


class DeckDetail extends Component {
	static navigationOptions = ({ navigation }) => {
		const { entryId } = navigation.state.params;
		return { title: `${entryId}` };
	};

	state = {
		deck: {},
		bounceValue: new Animated.Value(1)
	};


// Component Did Mount
// -------------------------------------------------------------------
	componentDidMount() {
		this.props.navigation.addListener('willFocus', this._getData);
		const { bounceValue } = this.state;
		Animated.sequence([
			Animated.timing(bounceValue, { duration: 400, toValue: 1.07 }),
			Animated.spring(bounceValue, { toValue: 1, friction: 2 })
		]).start();
	}


// Get the Data
// -------------------------------------------------------------------
	_getData = () => {
		this.props
			.getDeck(this.props.deckTitle)
			.then(() => this.setState({ deck: this.props.deck }));
	}


// Quiz Start
// -------------------------------------------------------------------
	onQuizStart = (disabled) => {
		if (sendNotifications) {
    			clearLocalNotification().then(setLocalNotification)
		}
		this.props.navigation.navigate("QuizView",{
			entryId: this.props.deckTitle
		});
	}


// Add Card
// -------------------------------------------------------------------
	onAddCard = () => {
		this.props.navigation.navigate("AddCard",{
			entryId: this.props.deckTitle
		});
	}


// Main Render
// -------------------------------------------------------------------
	render() {
		const { deck, bounceValue } = this.state;
		if (_.isEmpty(deck)) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color={purple} />
				</View>
			);
		}

		const size = deck.questions.length;

		return (
			<View style={styles.container}>

				<Animated.View style={[styles.card, {transform: [{ scale: bounceValue }]}]}>
					<Text style={styles.title}>{deck.title}</Text>
					<MaterialCommunityIcons name="cards-variant" size={80} color={purple} />
					<Text style={styles.details}>
						{size === 1? `${size} Card`: `${size} Cards`}
					</Text>
				</Animated.View>

				<TouchableOpacity style={styles.buttonSmall} onPress={this.onQuizStart} >
					<Text style={{ color:white, fontSize: 18 }}>
						Start Quiz
					</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.buttonSmall} onPress={this.onAddCard} >
					<Text style={{ color:white, fontSize: 18 }}>
						Add New Card
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}


// Styles Defined
// -------------------------------------------------------------------
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: light_purple,
		alignItems: "center",
		justifyContent: "space-around"
	},
	card: {
		width: 280,
		height: 280,
		backgroundColor: white,
		alignItems: "center",
		borderRadius: 12
	},
	title: {
		fontSize: 28,
		margin: 30,
		marginBottom: 20,
	},
	details: {
		fontSize: 20,
		opacity: 0.5,
		margin: 30,
		marginTop: 20,
		marginBottom: 10,
	},
	buttonSmall: {
		height: 42,
		width: 150,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: purple,
		borderRadius: 8
	},

});


// Map State To Props
// -------------------------------------------------------------------
function mapStateToProps(state, { navigation, deckReducer }) {
	return {
		deckTitle: navigation.state.params.entryId,
		deck: state.deckReducer
	};
}


// Map Dispatch To Props
// -------------------------------------------------------------------
function mapDispatchToProps(dispatch) {
	return {
		getDeck: title => dispatch(getDeckActionCreator(title))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);