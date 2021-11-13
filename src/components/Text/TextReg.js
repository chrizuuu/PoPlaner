import React from "react"
import { Text } from "react-native"
import styleText from "./style"

const TextReg = ({ color, fontSize, children }) => (
  <Text
    style={
      (styleText.textDefaultStyle,
      {
        fontFamily: "MontserratRegular",
        fontSize,
        color,
      })
    }
  >
    {children}
  </Text>
)

export default TextReg
