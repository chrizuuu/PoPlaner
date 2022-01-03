import React from "react"
import { Pressable } from "react-native"
import { Icon } from "react-native-vector-icons"
import colors from "../../styles/colorsLightTheme"

function CheckboxPriority({ status, onChange }) {
  const iconStatus = status === true ? "star" : "star-outline"
  const iconColor = status === true ? "#53D3AF" : colors.thirdColor
  return (
    <Pressable onPress={() => onChange()}>
      <Icon size={24} name={iconStatus} color={iconColor} />
    </Pressable>
  )
}

export default CheckboxPriority
