import React from "react";
import { Text, StyleSheet } from "react-native";

interface BodyTextProps {
	children?: any;
	style?: object;
}

const BodyText: React.FC<BodyTextProps> = ({ children, style }) => {
	return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
	body: {
		fontFamily: "open-sans",
	},
});

export default BodyText;
