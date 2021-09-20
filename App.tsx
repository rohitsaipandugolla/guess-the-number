import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import StartGameScreen from "./src/components/screens/StartGameScreen";
import Header from "./src/components/atoms/Header/Header";
import GameScreen from "./src/components/screens/GameScreen";
import GameOverScreen from "./src/components/screens/GameOverScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
	return Font.loadAsync({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});
};

export default function App() {
	const [userNumber, setUserNumber] = useState<number>();
	const [guessRounds, setGuessRounds] = useState(0);
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setDataLoaded(true)}
				onError={err => console.log(err)}
			/>
		);
	}

	const newGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(0);
	};

	const startGameHandler = (selectedNumber: number) => {
		setUserNumber(selectedNumber);
		setGuessRounds(0);
	};

	const gameOverHandler = (rounds: number) => {
		setGuessRounds(rounds);
	};

	let content = <StartGameScreen onStartGame={startGameHandler} />;

	if (userNumber && guessRounds <= 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (guessRounds > 0) {
		content = (
			<GameOverScreen
				roundsNumber={guessRounds}
				userNumber={userNumber!}
				onRestart={newGameHandler}
			/>
		);
	}

	return (
		<SafeAreaView style={styles.screen}>
			<Header title="Guess a Number" />
			{content}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
