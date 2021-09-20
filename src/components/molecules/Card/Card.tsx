import React from "react";
import { View, StyleSheet } from "react-native";

interface CardProps {
	style: object;
	children: any;
}

const Card: React.FC<CardProps> = ({ style, children }) => {
	return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
	card: {
		elevation: 8,
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
	},
});

export default Card;
