import React from "react"
import Reanimated, {
  useSharedValue,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated"
import { Pressable } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable)

function CheckboxPriority({ status, onChange, size, style, color }) {
  const iconStatus = status === true ? "star" : "star-outline"
  const iconColor = status === true ? "#53D3AF" : color || "rgb(210,210,210)"
  const iconScale = useSharedValue(1)

  const pressableOnPress = () => {
    iconScale.value = withSequence(
      withTiming(1.3, { duration: 200 }),
      withTiming(1, { duration: 400 })
    )
  }

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }))

  return (
    <ReanimatedPressable
      onPressOut={pressableOnPress}
      onPress={() => onChange()}
      style={[iconStyle, { ...style }]}
    >
      <Icon size={size} name={iconStatus} color={iconColor} />
    </ReanimatedPressable>
  )
}

export default CheckboxPriority
