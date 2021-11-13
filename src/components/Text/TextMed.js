import React from "react"
import { Text } from "react-native"
import styleText from "./style"

const TextMed = ({ color, fontSize, children }) => (
  <Text
    style={
      (styleText.textDefaultStyle,
      {
        fontFamily: "MontserratMedium",
        fontSize,
        color,
      })
    }
  >
    {children}
  </Text>
)

export default TextMed
