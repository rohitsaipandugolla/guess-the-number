import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView,
} from "react-native";
import BodyText from "../molecules/BodyText/BodyText";
import MainButton from "../molecules/MainButton/MainButton";
import TitleText from "../molecules/TitleText/TitleText";
import Colors from "../../constants/colors";

interface GameOverScreenProps {
	roundsNumber: number;
	userNumber: number;
	onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
	roundsNumber,
	userNumber,
	onRestart,
}) => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText children="Game is Over" />
				<View style={styles.imageContainer}>
					<Image
						source={require("../../../assets/success.png")}
						style={styles.image}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.resultContainer}>
					<BodyText style={styles.resultText}>
						Your phone needed{" "}
						<Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess
						the number <Text style={styles.highlight}>{userNumber}</Text>.
					</BodyText>
				</View>
				<MainButton children="New Game" onPress={onRestart} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 10,
	},
	imageContainer: {
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").width * 0.7,
		borderRadius: (Dimensions.get("window").width * 0.7) / 2,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: Dimensions.get("window").height / 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get("window").height / 60,
	},
	resultText: {
		textAlign: "center",
		fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
	},
	highlight: {
		color: Colors.primary,
		fontFamily: "open-sans-bold",
	},
});

export default GameOverScreen;
