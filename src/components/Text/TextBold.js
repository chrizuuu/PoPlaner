import React from "react"
import { Text } from "react-native"
import styleText from "./style"

const TextBold = ({ fontSize, style, children, maxLine }) => (
  <Text
    numberOfLines={maxLine}
    style={[
      styleText.textDefaultStyle,
      { fontFamily: "OpenSans-Bold", fontSize, ...style },
    ]}
  >
    {children}
  </Text>
)

export default TextBold
