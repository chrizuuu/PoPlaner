/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React from "react"
import {
  View,
  Text,
  Vibration,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { Icon } from "react-native-elements/dist/icons/Icon"
import BackgroundTimer from "react-native-background-timer"
import { differenceInSeconds } from "date-fns"
import { strings } from "../../../translations/translations"
import formatTime from "../../../components/Helpers/helpers"
import FlexLayout from "../../../components/Layouts/FlexLayout"
import ControlsPomodoroButton from "../../../components/Buttons/ControlsPomodoroButton"
import Timer from "../../../components/components/Timer"
import colors from "../../../styles/colorsLightTheme"

// const pomodoroTimeValue = [  0.2, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,70, 80, 90,]
// const breaksTimeValue = [0.2, 2, 5, 10, 15, 20, 25, 30]

const defaultProps = {
  types: [
    { name: "Pomodoro", time: 20 },
    { name: "Short Break", time: 20 },
    { name: "Long Break", time: 20 },
  ],
  statuses: [{ name: "Playing" }, { name: "Paused" }, { name: "Finished" }],
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

export default class PomodoroScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      type: defaultProps.types[0],
      time: defaultProps.types[0].time,
      playing: false,
      status: null,
      interval: null,
      countInterval: 0,
      autoBreakStart: true,
      autoLongBreakInterval: 4,
      autoPomodoroStart: true,
      // settingsIsOpen: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 11 }}
          onPress={() => this.setIsOpen((prevstate) => !prevstate.value)}
        >
          <Icon type="ionicon" name="information-circle-outline" />
        </TouchableOpacity>
      ),
    })
  }

  componentWillUnmount() {
    this.props.navigation.setOptions({
      headerRight: () => null,
    })
    this.stopTimer()
  }

  handlePomodoro = () => {
    this.stopTimer()
    BackgroundTimer.stopBackgroundTimer()
    Vibration.vibrate(100, 100, 100)
    if (this.state.type === defaultProps.types[0]) {
      this.handleCountInterval()
      this.state.countInterval % this.state.autoLongBreakInterval === 0
        ? this.handleType(defaultProps.types[2])
        : this.handleType(defaultProps.types[1])

      this.state.autoBreakStart
        ? this.startTimer()
        : this.setState({ status: defaultProps.statuses[2].name })
    } else {
      this.handleType(defaultProps.types[0])
      this.state.autoPomodoroStart
        ? this.startTimer()
        : this.setState({ status: null })
    }
  }

  handleCountInterval = () => {
    this.setState((prevState) => ({
      countInterval: prevState.countInterval + 1,
    }))
  }

  handleType = (type) => {
    this.stopTimer()
    this.setState({
      type,
      time: type.time,
      playing: false,
      status: null,
    })
  }

  setIsOpen = (visible) => {
    this.setState({
      settingsIsOpen: visible,
    })
  }

  startTimer = () => {
    const startTime = new Date()
    this.setState({
      status: defaultProps.statuses[0].name,
      playing: true,
      interval: BackgroundTimer.setInterval(() => {
        this.timer(startTime)
      }, 1000),
    })
  }

  stopTimer = () => {
    BackgroundTimer.clearInterval(this.state.interval)
    this.setState({
      interval: null,
    })
  }

  resetTimer = () => {
    this.stopTimer()
    this.setState((prevState) => ({
      time: prevState.type.time,
      playing: false,
      status: null,
      countInterval: 0,
    }))
  }

  skipTimer = () => {
    this.handlePomodoro()
  }

  pauseTimer = () => {
    if (this.state.playing) {
      this.stopTimer()
      this.setState({
        status: defaultProps.statuses[1].name,
        playing: false,
      })
    } else {
      this.startTimer()
    }
  }

  timer = (startTime) => {
    this.state.time < 1
      ? this.handlePomodoro()
      : /* eslint-disable react/no-access-state-in-setstate */
        this.setState(() => ({
          time:
            this.state.type.time -
            differenceInSeconds(new Date(), Date.parse(startTime)),
        }))
    /* eslint-enable react/no-access-state-in-setstate */
  }

  changeDefaultProps = (type, value) => {
    defaultProps.types[type].time = value * 60
    this.resetTimer()
  }

  changeIntervals = (value) => {
    this.setState({
      autoLongBreakInterval: value,
    })
    this.resetTimer()
  }

  changeAutoPomodoroStart = () => {
    this.setState((prevState) => ({
      autoPomodoroStart: !prevState.autoPomodoroStart,
    }))
    this.resetTimer()
  }

  changeAutoBreakStart = () => {
    this.setState((prevState) => ({
      autoBreakStart: !prevState.autoBreakStart,
    }))

    this.resetTimer()
  }

  render() {
    const timePercent =
      ((this.state.type.time - this.state.time) / this.state.type.time) * 100

    return (
      <FlexLayout style={{ color: "#282828" }}>
        <View style={styles.wrapper}>
          <Timer
            size="320"
            strokeWidth="18"
            strokeColor="#53D3AF"
            progress={timePercent}
          >
            <Pressable
              onPress={() => this.setIsOpen(!this.state.settingsIsOpen)}
            >
              <Text style={styles.timerValue}>
                {formatTime(this.state.time)}
              </Text>
            </Pressable>

            <Text style={styles.boldText}>
              {this.state.type === defaultProps.types[0]
                ? strings("stayFocus")
                : strings("takeBreak")}
              {this.state.type.time / 60} min
            </Text>
          </Timer>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <ControlsPomodoroButton
              start={this.startTimer}
              pause={this.pauseTimer}
              skip={this.skipTimer}
              reset={this.resetTimer}
              status={this.state.status}
            />
          </View>
          <Text>{this.state.countInterval}</Text>
        </View>
      </FlexLayout>
    )
  }
}

/*
<Modal
          animationIn="slideInRight"
          animationOut="slideOutRight"
          animationInTiming={600}
          isVisible={this.state.settingsIsOpen}
          swipeDirection="right"
          onSwipeComplete={() => this.setIsOpen(!this.state.settingsIsOpen)}
          onBackdropPress={() => this.setIsOpen(!this.state.settingsIsOpen)}
          style={sharedStyles.modalContainer}
        >
          <FlexLayout>
            <HeaderBar
              screenName="Pomodoro Settings"
              headerTextSize={18}
              style={sharedStyles.marginSide25}
              rightIcon={
                <>
                  <Pressable
                    onPress={() => this.setIsOpen(!this.state.settingsIsOpen)}
                  >
                    <Icon name="close" />
                  </Pressable>
                </>
              }
            />
            <View style={[sharedStyles.marginSide25, { marginTop: 30 }]}>
              <View>
                <SettingsBarHeader
                  settingsName={strings("focus")}
                  settingsValue={defaultProps.types[0].time / 60}
                />
                <FlatListSlider
                  data={pomodoroTimeValue}
                  currentValue={defaultProps.types[0].time / 60}
                  onPress={(value) => this.changeDefaultProps(0, value)}
                  showIndicator={false}
                />
              </View>
              <View>
                <SettingsBarHeader
                  style={{ marginTop: 30 }}
                  settingsName={strings("shortBreak")}
                  settingsValue={defaultProps.types[1].time / 60}
                />

                <FlatListSlider
                  data={breaksTimeValue}
                  currentValue={defaultProps.types[1].time / 60}
                  onPress={(value) => this.changeDefaultProps(1, value)}
                  showIndicator={false}
                />
              </View>
              <View>
                <SettingsBarHeader
                  style={{ marginTop: 30 }}
                  settingsName={strings("longBreak")}
                  settingsValue={defaultProps.types[2].time / 60}
                />
                <FlatListSlider
                  data={breaksTimeValue}
                  currentValue={defaultProps.types[2].time / 60}
                  onPress={(value) => this.changeDefaultProps(2, value)}
                  showIndicator={false}
                />
              </View>
              <View>
                <SettingsBarHeader
                  style={{ marginTop: 30 }}
                  settingsName={strings("longBreakIntervals")}
                  settingsValue={this.state.autoLongBreakInterval}
                />
                <FlatListSlider
                  data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                  currentValue={this.state.autoLongBreakInterval}
                  onPress={this.changeIntervals}
                  showIndicator={false}
                />
              </View>
              <SettingsSwitchBar
                style={{ marginTop: 30 }}
                settingsName={strings("autoStartPomodoro")}
                switchValue={this.state.autoPomodoroStart}
                onValueChange={() => this.changeAutoPomodoroStart()}
              />
              <SettingsSwitchBar
                style={{ marginTop: 30 }}
                settingsName={strings("autoStartBreak")}
                switchValue={this.state.autoBreakStart}
                onValueChange={() => this.changeAutoBreakStart()}
              />
            </View>
          </FlexLayout>
        </Modal>
*/
