import React from "react"
import { Text } from "react-native"
import sharedStyles from "../../styles/globalStyle"

const TextError = ({ errorValue }) => (
  <Text style={sharedStyles.errorText}>{errorValue}</Text>
)

export default TextError
