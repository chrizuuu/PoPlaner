import React from "react"
import { TouchableOpacity, Text } from "react-native"
import styleButton from "./style"

const LinkButton = ({ onPress, style, children }) => (
    <TouchableOpacity onPress={onPress} style={[{ ...style }]}>
      <Text style={[styleButton.linkText, { ...style }]}>{children}</Text>
    </TouchableOpacity>
  )

export default LinkButton
