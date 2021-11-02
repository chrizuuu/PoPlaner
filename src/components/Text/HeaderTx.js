import React from "react"
import { Text } from "react-native"
import sharedStyles from "../../styles/shared"
import styleText from "./style"

const HeaderTx = ({ style, children }) => (
    <Text style={[styleText.header, sharedStyles.marginBottom5, { ...style }]}>
      {" "}
      {children}{" "}
    </Text>
  )

export default HeaderTx
