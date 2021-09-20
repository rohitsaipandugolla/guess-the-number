import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-elements";
import Button from "../atoms/Button/Button";
import InputField from "../atoms/InputField/InputField";
import Card from "../molecules/Card/Card";
import NumberContainer from "../atoms/NumberContainer/NumberContainer";
import MainButton from "../molecules/MainButton/MainButton";

interface StartGameScreenProps {
	onStartGame: (selectedNumber: number) => void;
}

const StartGameScreen: React.FC<StartGameScreenProps> = ({ onStartGame }) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState<number>();
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get("window").width / 4
	);

	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(Dimensions.get("window").width / 4);

			Dimensions.addEventListener("change", updateLayout);
			return () => {
				Dimensions.removeEventListener("change", updateLayout);
			};
		};
	});

	const numberInputHandler = (input: string) => {
		setEnteredValue(input.replace(/[^0-9]/g, ""));
	};

	const resetInput = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInput = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert("Invalid number!", "Number has to be between 1 and 99.", [
				{ text: "Okay", style: "destructive", onPress: resetInput },
			]);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You Selected</Text>
				<NumberContainer children={selectedNumber} />
				<MainButton
					children="Start Game"
					onPress={() => onStartGame(selectedNumber!)}
				/>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<View style={styles.screen}>
						<Text style={styles.title}>Start a New Game!</Text>
						<Card style={styles.inputContainer}>
							<Text>Select a number</Text>
							<InputField
								style={styles.input}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button title="Reset" onPress={resetInput} type="outline" />
								</View>
								<View style={{ width: buttonWidth }}>
									<Button
										title="Confirm"
										onPress={confirmInput}
										type="outline"
									/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: "open-sans-bold",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	inputContainer: {
		width: "80%",
		maxWidth: "95%",
		minWidth: 300,
		alignItems: "center",
	},
	// button: {
	// 	// width: 100,
	// 	width: Dimensions.get("window").width / 4,
	// },
	input: {
		width: 50,
		textAlign: "center",
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center",
	},
});

export default StartGameScreen;
