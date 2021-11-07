import React, { useEffect, useState } from "react"
import { View, Dimensions } from "react-native"
import Svg, { Circle } from "react-native-svg"

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

const TimerSession = ({ currentInterval, maxInterval, timerCount }) => {
  const [arrayOfCircles, setArrayOfObjects] = useState([])
  const windowWidth = Dimensions.get("window").width

  const createCircles = () => {
    const updateArray = []
    for (let i = 1; i <= maxInterval; i += 1) {
      updateArray.push({ key: i, color: "rgb(230,230,230)" })
    }
    setArrayOfObjects(updateArray)
  }

  const updateCircle = () => {
    const copyArrayOfCircles = [...arrayOfCircles]
    const targetCircle = arrayOfCircles.findIndex(
      (circle) => circle.key === currentInterval
    )
    const newCircle = { key: currentInterval, color: "#53D3AF" }
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
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: windowWidth,
      }}
    >
      {renderMap}
    </View>
  )
}

export default TimerSession
