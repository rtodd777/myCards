// -------------------------------------------------------------------
// Object Name.... QuizView.js
// Description.... Take the Quiz
// Developer...... R. Todd Stephens
// Date Written... 3/27/2020
// -------------------------------------------------------------------
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { getDeckActionCreator } from "../actions/decks";
import { dark_pink, white, red, green, purple, light_purple } from "../utils/colors";

class QuizView extends Component {

// State Variables
// -------------------------------------------------------------------
	state = {
		questions: [],
		currentIndex: 0,
		whichSide: true,
		score: 0,
		bounceValue: new Animated.Value(1)
	};

// Component Did Mount
// -------------------------------------------------------------------
	componentDidMount() {
		this.props.getDeck(this.props.deckTitle);
		this.setState({
			questions: this.props.deck.questions
		});
	}


// Component Will Mount
// -------------------------------------------------------------------
	componentWillMount() {
		this.animatedValue = new Animated.Value(0);
		this.valueInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ["0deg", "180deg"]
		});
	}


// Spring Animation
// -------------------------------------------------------------------
	springAnimation() {
		const { whichSide } = this.state;
		Animated.spring(this.animatedValue, {
			toValue: whichSide ? 180 : 0,
			friction: 8,
			tension: 10
		}).start();
	}


// Bounce Animation
// -------------------------------------------------------------------
	bounceAnimation() {
		const { bounceValue } = this.state;
		Animated.sequence([
			Animated.timing(bounceValue, { duration: 300, toValue: 1.5 }),
			Animated.spring(bounceValue, { toValue: 1, friction: 4 })
		]).start();
	}


// Incorrect Press
// -------------------------------------------------------------------
	onIncorrectPress = () => {
		this.springAnimation();
		this.setState({
			currentIndex: this.state.currentIndex + 1,
			whichSide: true
		});
	};


// Correct Press
// -------------------------------------------------------------------
	onCorrectPress = () => {
		this.springAnimation();
		this.setState({
			currentIndex: this.state.currentIndex + 1,
			whichSide: true,
			score: this.state.score + 1
		});
	};


// Flip the Card
// -------------------------------------------------------------------
	flipCard = () => {
		this.springAnimation();
		this.setState({ whichSide: !this.state.whichSide });
	};


// Restart
// -------------------------------------------------------------------
	onRestart = () => {
		const { whichSide } = this.state;
		Animated.spring(this.animatedValue, {
			toValue: !whichSide ? 180 : 0,
			friction: 8,
			tension: 10
		}).start();
		this.setState({
			currentIndex: 0,
			whichSide: true,
			score: 0
		});
	};


// Render Progress Counter
// -------------------------------------------------------------------
	renderProgressCount() {
		const { questions, currentIndex } = this.state;
		return (
			<View style={styles.progress}>
				<Text style={styles.progressCount}>
					Progress: Question {currentIndex + 1} of {questions.length}
				</Text>
			</View>
		);
	}


// Show Loader
// -------------------------------------------------------------------
	renderLoader() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color={dark_pink} />
			</View>
		);
	}


// Show Scorecard
// -------------------------------------------------------------------
	renderScoreCard() {
		const { score, questions, bounceValue } = this.state;
		const percentage = score / questions.length * 100;
		this.bounceAnimation();

		return (
			<View style={styles.container}>
				<View style={styles.card}>
					<MaterialCommunityIcons name="cards-variant" size={80} color={purple} />
					<Text style={styles.score}>
						Your Score: {percentage.toString().substring(0, 5)}%
					</Text>
				</View>
				<TouchableOpacity style={styles.buttonReset} onPress={this.onRestart}>
					<Text style={{color: white, fontSize: 18}}>
						Restart Quiz
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonReset} onPress={() => this.props.goBack()}>
					<Text style={{ color: white, fontSize: 18 }}>
						Back to Deck
					</Text>
				</TouchableOpacity>
			</View>
		);
	}


// Show Answer Card Footer
// -------------------------------------------------------------------
	renderQuestionCardFooter() {
		return (
			<View style={styles.cardFooter}>
				<TouchableOpacity style={styles.rotateBtn} onPress={this.flipCard} >
					<Text style={styles.rotateLabel}>Show Answer</Text>
				</TouchableOpacity>
			</View>
		);
	}


// Show Answer Card Footer
// -------------------------------------------------------------------
	renderAnswerCardFooter() {
		return (
			<View style={styles.cardFooter}>
				<TouchableOpacity style={styles.rotateBtn} onPress={this.flipCard} >
					<Text style={styles.rotateLabel}>Show Question</Text>
				</TouchableOpacity>
				<View style={styles.cardButtons}>
					<TouchableOpacity style={styles.incorrect} onPress={this.onIncorrectPress} >
						<Text style={{ color: red, fontSize: 18, fontWeight: "bold" }} >
							Incorrect
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.correct} onPress={this.onCorrectPress} >
						<Text style={{ color: green, fontSize: 18, fontWeight: "bold" }} >
							Correct
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}


// Show Flip Card: Question and Answer
// -------------------------------------------------------------------
	renderCard() {
		const { whichSide, questions, currentIndex } = this.state;
		const que = questions[currentIndex];
		const customRotate = whichSide ? {} : { transform: [{ rotateY: "180deg" }] };
		return (
			<View style={[styles.card, customRotate]}>
				<View style={styles.cardContent}>
					<Text style={styles.cardText}>
						{whichSide ? que.question : que.answer}
					</Text>
				</View>
				{whichSide ? this.renderQuestionCardFooter() : this.renderAnswerCardFooter()}
			</View>
		);
	}


// Standard Rendor
// -------------------------------------------------------------------
	render() {
		const { questions, currentIndex, score } = this.state;

		const animatedStyle = {
			transform: [{ rotateY: this.valueInterpolate }]
		};

		if (questions.length === 0) {
			return this.renderLoader();
		} else if (currentIndex === questions.length) {
			return this.renderScoreCard();
		}
		return (
			<View style={styles.container}>
				<Animated.View style={animatedStyle}>
					{this.renderCard()}
				</Animated.View>
				{this.renderProgressCount()}
			</View>
		);
	}
}


// Styles
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
		height: 300,
		backgroundColor: white,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12
	},
	cardContent: {
		width: "100%",
		height: "70%",
		justifyContent: "center",
		alignItems: "center"
	},
	cardText: {
		fontSize: 26,
		margin: 20,
		textAlign: "center"
	},
	cardFooter: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	rotateBtn: {
		height: 42,
		width: 150,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: purple,
		borderRadius: 8,
		marginBottom: 80,
	},
	rotateLabel: {
		fontSize: 20,
		color: white
	},
	cardButtons: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 20
	},
	incorrect: {
		width: "100%",
		height: 42,
		width: 140,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: purple,
		borderBottomLeftRadius: 12,
	},
	correct: {
		width: "100%",
		height: 42,
		width: 140,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: purple,
		borderBottomRightRadius: 12,
	},
	progress: {
		width: "60%"
	},
	progressCount: {
		fontSize: 18,
		fontWeight: "bold"
	},
	score: {
		fontSize: 20,
		margin: 20
	},
	buttonReset: {
		height: 42,
		width: 150,
		alignItems: 'center',
		justifyContent: 'center',
		color: white,
		fontSize: 18,
		backgroundColor: purple,
		borderRadius: 8,
	}	
});


// Map State to Props
// -------------------------------------------------------------------
function mapStateToProps(state, { navigation, deckReducer }) {
	return {
		deckTitle: navigation.state.params.entryId,
		deck: state.deckReducer
	};
}


// Map Dispatch to Props
// -------------------------------------------------------------------
function mapDispatchToProps(dispatch, { navigation }) {
	return {
		getDeck: title => dispatch(getDeckActionCreator(title)),
		goBack: () => navigation.goBack()
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView);
