import React from "react"
import { View } from "react-native"
import globalStyle from "../../styles/globalStyle"

function FlexLayout({ children, style }) {
  return (
    <View
      style={[globalStyle.wrapperFlex, globalStyle.container, { ...style }]}
    >
      {children}
    </View>
  )
}

export default FlexLayout
