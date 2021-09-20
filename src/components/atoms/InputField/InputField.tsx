import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

interface InputFieldProps {
	placeholder?: string;
	value?: string;
	style?: object;
	onChangeText?: (enteredGoal: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
	placeholder,
	value,
	onChangeText,
	style,
}) => {
	return (
		<Input
			placeholder={placeholder}
			onChangeText={onChangeText}
			value={value}
			style={{ ...styles.input, ...style }}
			keyboardType="numeric"
			maxLength={2}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: "grey",
		// borderBottomWidth: 1,
		// marginVertical: 10,
	},
});

export default InputField;
