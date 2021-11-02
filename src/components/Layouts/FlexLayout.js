import React from "react"
import { View } from "react-native"
import sharedStyles from "../../styles/shared"

const FlexLayout = ({ children, style }) => (
    <View
      style={[sharedStyles.wrapperFlex, sharedStyles.container, { ...style }]}
    >
      {children}
    </View>
  )

export default FlexLayout
