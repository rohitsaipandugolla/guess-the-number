import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Alert,
	Dimensions,
	ScrollView,
} from "react-native";
import NumberContainer from "../atoms/NumberContainer/NumberContainer";
import Card from "../molecules/Card/Card";
import MainButton from "../molecules/MainButton/MainButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../molecules/BodyText/BodyText";

const generateRandomBetween: any = (
	min: number,
	max: number,
	exclude: number
) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const renderListItem = (value: number, numOfRound: number) => (
	<View key={value} style={styles.listItem}>
		<BodyText>#{numOfRound}</BodyText>
		<BodyText>{value}</BodyText>
	</View>
);

interface GameScreenProps {
	userChoice: any;
	onGameOver: (rounds: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ userChoice, onGameOver }) => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, userChoice)
	);
	const [pastGuesses, setPastGuesses] = useState<Array<number>>([
		generateRandomBetween(1, 100, userChoice),
	]);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get("window").height
	);
	const [rounds, setRounds] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceHeight(Dimensions.get("window").height);
		};

		Dimensions.addEventListener("change", updateLayout);

		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction: string) => {
		if (
			(direction === "lower" && currentGuess < userChoice) ||
			(direction === "greater" && currentGuess > userChoice)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setRounds((currRounds: number) => currRounds + 1);
		setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
	};

	if (availableDeviceHeight < 400) {
		return (
			<View style={styles.screen}>
				<Text>Opponent's Guess</Text>
				<NumberContainer children={currentGuess} />
				<View style={styles.controls}>
					<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
						<Ionicons name="md-remove" size={24} color="white" />
					</MainButton>
					<MainButton onPress={nextGuessHandler.bind(this, "greater")}>
						<Ionicons name="md-add" size={24} color="white" />
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					<ScrollView contentContainerStyle={styles.list}>
						{pastGuesses.map((guess, index) =>
							renderListItem(guess, pastGuesses.length - index)
						)}
					</ScrollView>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess</Text>
			<NumberContainer children={currentGuess} />
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, "greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	controls: {
		width: "80%",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
		width: 300,
		maxWidth: "80%",
	},
	listContainer: {
		flex: 1,
		width: "80%",
	},
	list: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		width: Dimensions.get("window").width > 400 ? "60%" : "80%",
	},
});

export default GameScreen;
