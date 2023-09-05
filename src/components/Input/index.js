import { TextInput } from "react-native";
import { useState } from "react";
import styles from "./styles";

export default function Input({ isPassword, style }) {
  const [text, setText] = useState();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={(text) => setText(text)}
      value={text}
      secureTextEntry={isPassword}
      style={[styles.input, isFocused ? styles.inputFocused : null, style]}
    />
  );
}
