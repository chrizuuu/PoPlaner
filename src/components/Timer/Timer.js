/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { differenceInSeconds } from "date-fns"
import TimerCycle from "./TimerCycle"
import TimerController from "./TimerController"
import TimerSession from "./TimerSessions"
import formatTime from "../Helpers/helpers"
import colors from "../../styles/colorsLightTheme"
import { strings } from "../../translations/translations"

const timerProps = {
  types: [
    { name: "Pomodoro", time: 2 },
    { name: "Short Break", time: 2 },
    { name: "Long Break", time: 4 },
  ],
}

const styles = StyleSheet.create({
  timerValue: {
    fontSize: 58,
    fontFamily: "MontserratBold",
    color: colors.textColor,
  },
  boldText: {
    fontFamily: "MontserratMedium",
    color: colors.textColor,
    position: "relative",
    top: 30,
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
      countTimer: 0,
      intervalToLongBreak: 4,
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  handleCountInterval = () => {
    this.setState((prevState) => ({
      countInterval: prevState.countInterval + 1,
    }))
  }

  handleType = (_type) => {
    this.stopTimer()
    this.setState({
      type: _type,
      actualTime: _type.time,
      durationTime: _type.time,
      isPlaying: false,
    })
  }

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
    this.setState((prevState) => ({
      countTimer: prevState.countTimer + 1,
    }))
    if (this.state.type === timerProps.types[0]) {
      this.handleCountInterval()
      if (this.state.countInterval % this.state.intervalToLongBreak === 0) {
        this.handleType(timerProps.types[2])
        this.setState(() => ({
          countInterval: 0,
          countTimer: -1,
        }))
      } else this.handleType(timerProps.types[1])
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
          size="365"
          strokeWidth="20"
          strokeColor="#53D3AF"
          progress={timePercent}
        >
          <Text style={styles.timerValue}>
            {formatTime(this.state.actualTime)}
          </Text>
          <Text style={styles.boldText}>
            {this.state.type === timerProps.types[0]
              ? strings("stayFocus")
              : strings("takeBreak")}
            {this.state.type.time / 60} min
          </Text>
        </TimerCycle>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <TimerSession
            maxInterval={this.state.intervalToLongBreak}
            currentInterval={this.state.countInterval}
            timerCount={this.state.countTimer}
          />
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
