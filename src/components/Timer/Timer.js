/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React from "react"
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
}

const styles = StyleSheet.create({
  timerValue: {
    fontSize: 60,
    fontFamily: "MontserratBold",
    color: colors.textColor,
  },
})

class Timer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      type: timerProps.types[0],
      actualTime: timerProps.types[0].time,
      durationTime: timerProps.types[0].time,
      isPlaying: false,
      interval: null,
      countInterval: 0,
      longBreakInterval: 4,
    }
  }

  // done
  componentWillUnmount() {
    this.stopTimer()
  }

  // done
  handleCountInterval = () => {
    this.setState((prevState) => ({
      countInterval: prevState.countInterval + 1,
    }))
  }

  // done
  handleType = (_type) => {
    this.stopTimer()
    this.setState({
      type: _type,
      actualTime: _type.time,
      durationTime: _type.time,
      isPlaying: false,
    })
  }

  // done
  handleTimer = () => {
    this.state.isPlaying ? this.pauseTimer() : this.startTimer()
  }

  startTimer = () => {
    const startTime = new Date()
    this.setState({
      isPlaying: true,
      interval: BackgroundTimer.setInterval(() => {
        this.timerMechanism(startTime)
      }, 1000),
    })
  }

  pauseTimer = () => {
    this.stopTimer()
    this.setState((prevState) => ({
      isPlaying: false,
      durationTime: prevState.actualTime,
    }))
  }

  skipTimer = () => {
    this.manageTimer()
  }

  resetTimer = () => {
    this.stopTimer()
    this.setState((prevState) => ({
      actualTime: prevState.type.time,
      durationTime: prevState.type.time,
      countInterval: 0,
    }))
  }

  stopTimer = () => {
    BackgroundTimer.clearInterval(this.state.interval)
    this.setState({
      interval: null,
      isPlaying: false,
    })
  }

  manageTimer = () => {
    this.stopTimer()
    if (this.state.type === timerProps.types[0]) {
      this.handleCountInterval()
      this.state.countInterval % this.state.longBreakInterval === 0
        ? this.handleType(timerProps.types[2])
        : this.handleType(timerProps.types[1])
    } else {
      this.handleType(timerProps.types[0])
    }
  }

  timerMechanism = (startTime) => {
    this.state.actualTime < 1
      ? this.manageTimer()
      : /* eslint-disable react/no-access-state-in-setstate */
        this.setState({
          actualTime:
            this.state.durationTime -
            differenceInSeconds(new Date(), Date.parse(startTime)),
        })
  }

  render() {
    const timePercent =
      ((this.state.type.time - this.state.actualTime) / this.state.type.time) *
      100
    return (
      <View>
        <TimerCycle
          size="350"
          strokeWidth="20"
          strokeColor="#53D3AF"
          progress={timePercent}
        >
          <Text style={styles.timerValue}>
            {formatTime(this.state.actualTime)}
          </Text>
        </TimerCycle>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TimerController
            handleTimer={this.handleTimer}
            isPlaying={this.state.isPlaying}
            skip={this.skipTimer}
            reset={this.resetTimer}
          />
        </View>
      </View>
    )
  }
}

export default Timer
