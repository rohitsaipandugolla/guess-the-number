import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

export interface NumberContainerProps {
	children: number | undefined;
}

const NumberContainer: React.FC<NumberContainerProps> = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.number}>{children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderColor: "red",
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	number: {
		color: "blue",
		fontSize: 22,
	},
});

export default NumberContainer;
