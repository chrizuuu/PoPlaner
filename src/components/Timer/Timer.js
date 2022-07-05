import React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import BackgroundTimer from "react-native-background-timer"
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

const timerProps = {
  types: [
    { name: "Pomodoro", time: 1500 },
    { name: "Short Break", time: 300 },
    { name: "Long Break", time: 900 },
  ],
}

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

  handleCountInterval = callback => {
    this.setState(
      prevState => ({
        countInterval: prevState.countInterval + 1,
      }),
      callback
    )
  }

  handleCountTimer = () => {
    this.setState(prevState => ({
      countTimer: prevState.countTimer + 1,
    }))
  }

  handleType = _type => {
    this.stopTimer()
    this.setState({
      type: _type,
      actualTime: _type.time,
      durationTime: _type.time,
      isPlaying: false,
    })
  }

  handleTimer = () => {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.isPlaying) this.pauseTimer()
    else this.startTimer()
  }

  startTimer = () => {
    const startTime = new Date()
    startTime.setMilliseconds(0)
    this.setState({
      isPlaying: true,
      interval: BackgroundTimer.setInterval(() => {
        this.timerMechanism(startTime)
      }, 1000),
    })
  }

  pauseTimer = () => {
    this.stopTimer()
    this.setState(prevState => ({
      isPlaying: false,
      durationTime: prevState.actualTime,
    }))
  }

  skipTimer = () => {
    this.manageTimer()
  }

  resetTimer = () => {
    this.stopTimer()
    this.setState(prevState => ({
      actualTime: prevState.type.time,
      durationTime: prevState.type.time,
      countInterval: prevState.countInterval,
      countTimer: prevState.countTimer,
    }))
  }

  stopTimer = () => {
    // eslint-disable-next-line react/destructuring-assignment
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
    const { type } = this.state
    if (type === timerProps.types[0]) {
      this.handleCountInterval(() => {
        const { countInterval, intervalToLongBreak } = this.state
        if (countInterval % intervalToLongBreak === 0) {
          this.handleType(timerProps.types[2])
        } else {
          this.handleType(timerProps.types[1])
        }
      })
    } else if (type === timerProps.types[2]) {
      this.resetCounter()
      this.handleType(timerProps.types[0])
    } else if (type === timerProps.types[1]) {
      this.handleType(timerProps.types[0])
    }
  }

  timerMechanism = startTime => {
    const { actualTime, durationTime } = this.state
    if (actualTime < 1) this.manageTimer()
    /* eslint-disable react/no-access-state-in-setstate */ else {
      const currentTime = new Date()
      currentTime.setMilliseconds(0)
      this.setState({
        actualTime:
          durationTime -
          differenceInSeconds(currentTime, Date.parse(startTime)),
      })
    }
  }

  render() {
    const {
      countInterval,
      countTimer,
      intervalToLongBreak,
      actualTime,
      type,
      isPlaying,
    } = this.state
    const time = actualTime >= 0 ? actualTime : 0
    const timePercent = ((type.time - time) / type.time) * 100
    return (
      <View
        style={{
          justifyContent: "space-evenly",
          height: windowHeight - 60,
        }}>
        <View>
          <TimerCycle
            size={windowWidth}
            strokeWidth="16"
            strokeColor="#53D3AF"
            progress={timePercent}>
            <Text style={[styles.timerValueText, styles.timerText]}>
              {formatTimerTime(time)}
            </Text>
            <Text style={[styles.timerText, styles.timerStatusText]}>
              {type === timerProps.types[0]
                ? strings("timerStayFocus")
                : strings("timerTakeBreak")}
              {type.time / 60}
              min
            </Text>
          </TimerCycle>
          <TimerSession
            currentInterval={countInterval}
            maxInterval={intervalToLongBreak}
            timerCount={countTimer}
            style={{ top: 25 }}
          />
        </View>
        <TimerController
          handleTimer={this.handleTimer}
          isPlaying={isPlaying}
          skip={this.skipTimer}
          reset={this.resetTimer}
        />
      </View>
    )
  }
}

export default Timer
