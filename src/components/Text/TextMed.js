import React from "react"
import { Text } from "react-native"
import styleText from "./style"

const TextMed = ({ fontSize, style, children }) => (
  <Text
    style={[
      styleText.textDefaultStyle,
      { fontFamily: "OpenSans-Medium", fontSize, ...style },
    ]}
  >
    {children}
  </Text>
)

export default TextMed
