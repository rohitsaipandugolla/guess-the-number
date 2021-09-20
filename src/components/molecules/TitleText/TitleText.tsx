import React from "react";
import { Text, StyleSheet } from "react-native";

interface TitleTextProps {
	children?: string;
	style?: object;
}

const TitleText: React.FC<TitleTextProps> = ({ children, style }) => (
	<Text style={{ ...styles.title, ...style }}>{children}</Text>
);

const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 18,
	},
});
export default TitleText;
