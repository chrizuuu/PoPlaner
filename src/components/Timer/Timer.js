import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { differenceInSeconds } from "date-fns"
import TimerCycle from "./TimerCycle"
import TimerController from "./TimerController"
import formatTime from "../Helpers/helpers"
import colors from "../../styles/colorsLightTheme"

const timerProps = {
  types: [
    { name: "Pomodoro", time: 4 },
    { name: "Short Break", time: 3 },
    { name: "Long Break", time: 10 },
  ],
  statuses: [{ name: "isPlaying" }, { name: "Paused" }, { name: "Finished" }],
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 50,
    height: "100%",
    paddingBottom: 80,
    backgroundColor: colors.primeColor,
  },

  boldText: {
    fontFamily: "MontserratMedium",
    color: colors.textColor,
  },

  timerValue: {
    fontSize: 60,
    fontFamily: "MontserratBold",
    color: colors.textColor,
  },

  box: {
    width: "100%",
  },
  buttonS: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 35,
  },
})

const Timer = () => {
  const [type, setType] = useState(timerProps.types[0])
  const [actualTime, setActualTime] = useState(timerProps.types[0].time)
  const [durationTIme, setDurationTime] = useState(timerProps.types[0].time)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timerInterval, setTimerInterval] = useState(null)
  const [countInterval, setCountInterval] = useState(0)
  const [intervalToLongBreak] = useState(4)

  const stopTimer = () => {
    BackgroundTimer.clearInterval(timerInterval)
    setTimerInterval(null)
    setIsPlaying(false)
  }

  const manageType = (_type) => {
    setType(_type)
    setActualTime(_type.time)
    setDurationTime(_type.time)
  }

  const manageTimer = () => {
    stopTimer()
    if (type === timerProps.types[0]) {
      setCountInterval(countInterval + 1)
      if (countInterval % intervalToLongBreak === 0)
        manageType(timerProps.types[2])
      else manageType(timerProps.types[1])
    } else {
      manageType(timerProps[0])
    }
  }

  const timerMechanism = (startTime) => {
    if (actualTime < 1) {
      manageTimer()
      console.log("END timer")
    } else {
      setActualTime(
        durationTIme - differenceInSeconds(new Date(), Date.parse(startTime))
      )
    }
    console.log(actualTime)
  }

  const startTimer = () => {
    const startTime = new Date()
    setTimerInterval(
      BackgroundTimer.setInterval(() => {
        timerMechanism(startTime)
      }, 1000)
    )
    setIsPlaying(true)
  }

  const pauseTimer = () => {
    stopTimer()
    setDurationTime(actualTime)
  }

  const handleTimer = () => {
    if (isPlaying) pauseTimer()
    else startTimer()
  }

  const skipTimer = () => {
    stopTimer()
    manageTimer()
  }

  const resetTimer = () => {
    stopTimer()
    setActualTime(type.time)
    setDurationTime(type.time)
    setIsPlaying(false)
    setCountInterval(0)
  }

  const timePercent = ((type.time - actualTime) / type.time) * 100

  return (
    <View>
      <TimerCycle
        size="355"
        strokeWidth="20"
        strokeColor="#53D3AF"
        progress={timePercent}
      >
        <Text style={styles.timerValue}>{formatTime(actualTime)}</Text>
      </TimerCycle>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TimerController
          handleTimer={handleTimer}
          isPlaying={isPlaying}
          skip={skipTimer}
          reset={resetTimer}
        />
      </View>
      <Text>{type.time}</Text>
    </View>
  )
}

export default Timer
