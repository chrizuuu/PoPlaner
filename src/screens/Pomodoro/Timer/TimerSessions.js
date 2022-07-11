/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-enable react/prop-types */

import React, { useEffect, useState } from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"
import { strings } from "../../../translations/translations"
// import { strings } from "../../translations/translations"

const windowWidth = Dimensions.get("window").width - 60

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: windowWidth,
  },
  sessionText: {
    width: "100%",
    top: 10,
    marginBottom: 30,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "rgb(128,128,128)",
    textAlign: "center",
  },
})

const TimerSessionCircle = ({ color }) => {
  const size = 20
  const strokeWidth = 3
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2

  return (
    <Svg width={size} height={size}>
      <Circle
        stroke={color}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
      />
    </Svg>
  )
}

function TimerSession({ currentInterval, maxInterval, timerCount, style }) {
  const [arrayOfCircles, setArrayOfObjects] = useState([])

  const createCircles = () => {
    const newArrayOfCircles = []
    for (let i = 1; i <= maxInterval; i += 1) {
      newArrayOfCircles.push({ key: i, color: "rgb(230,230,230)" })
    }
    setArrayOfObjects(newArrayOfCircles)
  }

  const updateCircle = () => {
    const copyArrayOfCircles = [...arrayOfCircles]
    const targetCircle = arrayOfCircles.findIndex(
      circle => circle.key === currentInterval
    )
    const newCircle = { key: currentInterval, color: "rgb(83,211,175)" }
    copyArrayOfCircles[targetCircle] = newCircle
    setArrayOfObjects(copyArrayOfCircles)
  }

  useEffect(() => {
    createCircles()
  }, [maxInterval])

  useEffect(() => {
    if (currentInterval > 0) updateCircle()
  }, [currentInterval])

  useEffect(() => {
    if ((timerCount / 2) % maxInterval === 0) {
      createCircles()
    }
  }, [timerCount])

  const renderMap = arrayOfCircles.map(({ color, key }) => (
    <TimerSessionCircle key={key} color={color} />
  ))

  return (
    <View style={[styles.container, { ...style }]}>
      <View style={styles.wrapper}>{renderMap}</View>
      <Text style={styles.sessionText}>
        {currentInterval}/{maxInterval} {strings("timerSessions")}
      </Text>
    </View>
  )
}

export default TimerSession
