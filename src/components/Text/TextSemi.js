import React from "react"
import { Text } from "react-native"
import styleText from "./style"

const TextSemi = ({ fontSize, style, children }) => (
  <Text
    style={[
      styleText.textDefaultStyle,
      { fontFamily: "OpenSans-SemiBold", fontSize, ...style },
    ]}
  >
    {children}
  </Text>
)

export default TextSemi
