// -------------------------------------------------------------------
// Object Name.... SplashScreen.js
// Description.... Splash Screen
// Developer...... R. Todd Stephens
// Date Written... 3/27/2020
// -------------------------------------------------------------------
import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

// Local Imports
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { purple, white, light_purple } from "../utils/colors";

export default class SplashScreen extends Component {
	state= {
		bounceValue: new Animated.Value(1),
	}

// Component Will Mount
// -------------------------------------------------------------------
	componentWillMount() {
		var navigator = this.props.navigation;
		setTimeout(() => {
			navigator.replace('Home');
		}, 2000);
	}


// Component Did Mount
// -------------------------------------------------------------------
	componentDidMount() {
		const { bounceValue } = this.state;
		Animated.sequence([
			Animated.timing(bounceValue, { duration: 400, toValue: 1.1 }),
			Animated.spring(bounceValue, { toValue: 1, friction: 2 })
		]).start();
	}


// Main Render
// -------------------------------------------------------------------
	render() {
		const { bounceValue } = this.state;
		return (
			<View style={styles.container}>
				<Animated.View style={[styles.icon, {transform: [{ scale: bounceValue }]}]}>
					<MaterialCommunityIcons name="cards-variant" size={150} color={white} />
					<Text style={styles.loading}>Loading...</Text>
				</Animated.View>
				<Text style={styles.name}>My Cards</Text>
			</View>
		);
	}
}


// Create Styles
// -------------------------------------------------------------------
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: purple,
		alignItems: "center",
	},
	icon: {
		marginTop: 'auto',
		marginBottom: 'auto'
	},
	name: {
		marginTop: 'auto',
		marginBottom: 10,
		fontSize: 20,
		fontWeight: 'bold',
		color: light_purple
	},
	loading: {
		margintop: 10,
		fontSize: 24,
		fontWeight: 'bold',
		color: light_purple,
		alignItems: "center",
		marginLeft: 10
	}

});
