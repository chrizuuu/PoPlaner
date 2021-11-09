/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import BackgroundTimer from "react-native-background-timer"
import { differenceInSeconds } from "date-fns"
import TimerCycle from "./TimerCycle"
import TimerController from "./TimerController"
import TimerSession from "./TimerSessions"
import formatTime from "../Helpers/helpers"
import colors from "../../styles/colorsLightTheme"
import { strings } from "../../translations/translations"

const windowHeight = Dimensions.get("window").height - 60
const windowWidth = Dimensions.get("window").width - 60

const timerProps = {
  types: [
    { name: "Pomodoro", time: 3 },
    { name: "Short Break", time: 2 },
    { name: "Long Break", time: 5 },
  ],
}

const styles = StyleSheet.create({
  timerText: {
    textAlign: "center",
    width: windowWidth,
    color: colors.textColor,
  },
  timerValueText: {
    fontSize: windowWidth / 6,
    fontFamily: "MontserratBold",
  },
  timerStatusText: {
    fontFamily: "MontserratMedium",
    position: "relative",
    top: 30,
    fontSize: 14,
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

  handleCountInterval = (callback) => {
    this.setState(
      (prevState) => ({
        countInterval: prevState.countInterval + 1,
      }),
      callback
    )
  }

  handleCountTimer = () => {
    this.setState((prevState) => ({
      countTimer: prevState.countTimer + 1,
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
      countInterval: prevState.countInterval,
      countTimer: prevState.countTimer,
    }))
  }

  stopTimer = () => {
    BackgroundTimer.clearInterval(this.state.interval)
    this.setState({
      interval: null,
      isPlaying: false,
    })
  }

  resetCounter = () => {
    this.setState(() => ({
      countInterval: 0,
      countTimer: 0,
    }))
  }

  manageTimer = () => {
    this.stopTimer()
    this.handleCountTimer()
    const timerType = this.state.type
    if (timerType === timerProps.types[0]) {
      this.handleCountInterval(() => {
        if (this.state.countInterval % this.state.intervalToLongBreak === 0) {
          this.handleType(timerProps.types[2])
        } else {
          this.handleType(timerProps.types[1])
        }
      })
    } else if (timerType === timerProps.types[2]) {
      this.resetCounter()
      this.handleType(timerProps.types[0])
    } else if (timerType === timerProps.types[1]) {
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
    const time = this.state.actualTime >= 0 ? this.state.actualTime : 0
    const timePercent =
      ((this.state.type.time - time) / this.state.type.time) * 100
    return (
      <View
        style={{
          justifyContent: "space-evenly",
          height: windowHeight,
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
              {formatTime(time)}
            </Text>
            <Text style={[styles.timerText, styles.timerStatusText]}>
              {this.state.type === timerProps.types[0]
                ? strings("stayFocus")
                : strings("takeBreak")}
              {this.state.type.time / 60} min
            </Text>
          </TimerCycle>
          <TimerSession
            currentInterval={this.state.countInterval}
            maxInterval={this.state.intervalToLongBreak}
            timerCount={this.state.countTimer}
            style={{ top: 25 }}
          />
        </View>
        <TimerController
          handleTimer={this.handleTimer}
          isPlaying={this.state.isPlaying}
          skip={this.skipTimer}
          reset={this.resetTimer}
        />
      </View>
    )
  }
}

export default Timer
