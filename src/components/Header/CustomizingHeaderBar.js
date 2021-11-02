import React from "react"
import { View } from "react-native"
import InLineLayout from "../Layouts/InLineLayout"
import styleHeader from "./style"

const CustomizingHeaderBar = ({ style, leftSide, centerSide, rightSide }) => (
    <View style={[styleHeader.container, { ...style }]}>
      <InLineLayout style={styleHeader.wrapper}>
        {leftSide ? (
          <View style={styleHeader.iconWrapper}>{leftSide}</View>
        ) : (
          <View style={styleHeader.iconWrapper} />
        )}

        {centerSide}

        {rightSide ? (
          <View style={styleHeader.iconWrapper}>{rightSide}</View>
        ) : (
          <View style={styleHeader.iconWrapper} />
        )}
      </InLineLayout>
    </View>
  )

export default CustomizingHeaderBar
