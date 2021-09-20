import React from "react";
import { Button as AppButton } from "react-native-elements";

interface ButtonProps {
	title?: string;
	onPress?: () => void;
	type?: "clear" | "outline";
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type }) => {
	return <AppButton title={title} onPress={onPress} type={type} />;
};

export default Button;
