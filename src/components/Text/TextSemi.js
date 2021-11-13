import React from "react"
import { Text } from "react-native"
import styleText from "./style"

const TextSemi = ({ color, fontSize, children }) => (
  <Text
    style={
      (styleText.textDefaultStyle,
      {
        fontFamily: "MontserratSemiBold",
        fontSize,
        color,
      })
    }
  >
    {children}
  </Text>
)

export default TextSemi
