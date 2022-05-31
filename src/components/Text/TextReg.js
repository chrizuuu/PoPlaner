import React from "react"
import { Text } from "react-native"
import styleText from "./style"

const TextReg = ({ fontSize, style, children, maxLine }) => (
  <Text
    numberOfLines={maxLine}
    style={[
      styleText.textDefaultStyle,
      { fontFamily: "OpenSans-Regular", fontSize, ...style },
    ]}
  >
    {children}
  </Text>
)

export default TextReg
