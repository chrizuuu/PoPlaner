import React from "react"
import { View } from "react-native"
import sharedStyles from "../../styles/shared"

function FlexLayout({ children, style }) {
  return (
    <View
      style={[sharedStyles.wrapperFlex, sharedStyles.container, { ...style }]}
    >
      {children}
    </View>
  )
}

export default FlexLayout
