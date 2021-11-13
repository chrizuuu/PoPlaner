import React from "react"
import { Text } from "react-native"
import styleText from "./style"

const TextBold = ({ color, fontSize, children }) => (
  <Text
    style={
      (styleText.textDefaultStyle,
      {
        fontFamily: "MontserratBold",
        fontSize,
        color,
      })
    }
  >
    {children}
  </Text>
)

export default TextBold
