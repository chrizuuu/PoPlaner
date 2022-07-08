/* eslint-disable default-case */
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { useSelector } from "react-redux"
import { differenceInSeconds } from "date-fns"
import TimerCycle from "./TimerCycle"
import TimerController from "./TimerController"
import TimerSession from "./TimerSessions"
import formatTimerTime from "../Helpers/formatTimerTime"
import colors from "../../styles/colorsLightTheme"
import { strings } from "../../translations/translations"

const windowHeight = Dimensions.get("window").height - 60
const windowWidth = Dimensions.get("window").width - 60

const styles = StyleSheet.create({
  timerText: {
    textAlign: "center",
    width: windowWidth,
    color: colors.textColor,
  },
  timerValueText: {
    fontSize: windowWidth / 6,
    fontFamily: "Montserrat-Bold",
  },
  timerStatusText: {
    fontFamily: "Montserrat-Medium",
    position: "relative",
    top: 30,
    fontSize: 14,
  },
})

function TimerFunctionalComponent() {
  // Selectors
  // ===========================================================================
  const focusTime = useSelector(state => state.pomodoro.focusTime)
  const shortBreak = useSelector(state => state.pomodoro.shortBreak)
  const longBreak = useSelector(state => state.pomodoro.longBreak)
  const workingSessions = useSelector(state => state.pomodoro.workingSessions)
  const autoStartBreak = useSelector(state => state.pomodoro.autoStartBreak)
  const autoStartPomodoro = useSelector(
    state => state.pomodoro.autoStartPomodoro
  )

  const timerType = [
    { name: "Pomodoro", time: focusTime * 60 },
    { name: "ShortBreak", time: shortBreak * 60 },
    { name: "LongBreak", time: longBreak * 60 },
  ]

  // Local State
  // ===========================================================================
  const [type, setType] = useState(timerType[0])
  const [durationTime, setDurationTime] = useState(timerType[0].time)
  const [actualTime, setActualTime] = useState(timerType[0].time)
  const [isPlaying, setIsPlaying] = useState(false)
  const [interval, setTimerInterval] = useState(null)
  const [countInterval, setCountInterval] = useState(0)
  const [countPomodoro, setCountPomodoro] = useState(0)

  // Timer functions
  // ===========================================================================

  // Stop running timer
  const stopTimer = () => {
    BackgroundTimer.clearInterval(interval)
    setIsPlaying(false)
    setTimerInterval(null)
  }

  // Pause timer.
  const pauseTimer = () => {
    stopTimer()
    setDurationTime(actualTime)
  }

  const resetTimer = () => {
    stopTimer()
    setActualTime(type.time)
    setDurationTime(type.time)
  }

  // Reset interval and pomodoro counters
  const resetCounter = () => {
    setCountInterval(0)
    setCountPomodoro(0)
  }

  const addCountInterval = () => {
    setCountInterval(countInterval + 1)
  }

  const addPomodoro = () => {
    setCountPomodoro(countPomodoro + 1)
  }

  // Change type of timer and set correct time
  const changeType = _type => {
    setType(_type)
    setDurationTime(_type.time)
    setActualTime(_type.time)
  }

  // Run when the actual Time will be less than 1
  const manageTimerOnEnd = () => {
    stopTimer()
    addPomodoro()

    if (type.name === "Pomodoro") {
      addCountInterval()
    } else if (type.name === "LongBreak") {
      resetCounter()
      changeType(timerType[0])
    } else if (type.name === "ShortBreak") {
      changeType(timerType[0])
    }
  }

  const timerMechanism = startTime => {
    const currentTime = new Date()
    currentTime.setMilliseconds(0)
    setActualTime(
      durationTime - differenceInSeconds(currentTime, Date.parse(startTime))
    )
  }

  const startTimer = () => {
    const startTime = new Date()
    startTime.setMilliseconds(0)
    setIsPlaying(true)
    setTimerInterval(
      BackgroundTimer.setInterval(() => {
        timerMechanism(startTime)
      }, 1000)
    )
  }

  // Function responsible for pausing / resuming the timer
  const toggleTimer = () => {
    if (isPlaying) return pauseTimer()
    return startTimer()
  }

  // Hooks
  // ===========================================================================

  useEffect(() => {
    if (actualTime < 1) {
      manageTimerOnEnd()
    }
  }, [actualTime])

  useEffect(() => {
    if (countInterval !== 0) {
      if (countInterval % workingSessions === 0) {
        changeType(timerType[2])
      } else {
        changeType(timerType[1])
      }
    }
  }, [countInterval])

  useEffect(() => {
    if (type.name === "Pomodoro" && autoStartPomodoro) {
      startTimer()
    } else if ((type.name === "ShortBreak" || "LongBreak") && autoStartBreak) {
      startTimer()
    }
  }, [type])

  const time = actualTime >= 0 ? actualTime : 0
  const timePercent = ((type.time - time) / type.time) * 100
  return (
    <View
      style={{
        justifyContent: "space-evenly",
        height: windowHeight - 60,
      }}
    >
      <View>
        <TimerCycle
          size={windowWidth}
          strokeWidth="16"
          strokeColor="#53D3AF"
          progress={timePercent}
        >
          <Text style={[styles.timerValueText, styles.timerText]}>
            {formatTimerTime(time)}
          </Text>
          <Text style={[styles.timerText, styles.timerStatusText]}>
            {type.name === "Pomodoro"
              ? strings("timerStayFocus")
              : strings("timerTakeBreak")}
            {durationTime}
            {' '}
            min
          </Text>
        </TimerCycle>
        <TimerSession
          currentInterval={countInterval}
          maxInterval={workingSessions}
          timerCount={countPomodoro}
          style={{ top: 25 }}
        />
      </View>
      <TimerController
        handleTimer={toggleTimer}
        isPlaying={isPlaying}
        skip={manageTimerOnEnd}
        reset={resetTimer}
      />
    </View>
  )
}

export default TimerFunctionalComponent
