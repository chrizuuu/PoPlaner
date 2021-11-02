import React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  childrenContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
})

const Timer = ({ size, strokeWidth, strokeColor, progress, children }) => {
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#EBEBEB"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={strokeColor}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * progress) / 100}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>

      <View style={styles.childrenContainer}>{children}</View>
    </View>
  )
}

export default Timer
