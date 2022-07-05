/* eslint-disable no-underscore-dangle */
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { ScrollView } from "react-native"
import SettingsBarHeader from "../components/Settings/SettingsHeaderBar"
import SettingSlider from "../components/Settings/SettingSlider"
import SettingSwitch from "../components/Settings/SettingSwitch"
import {
  changeFocusTime,
  changeShortBreak,
  changeLongBreak,
  changeWorkingSessions,
  toggleAutoStartPomodoro,
  toggleAutoStartBreak,
} from "../redux/features/pomodoro/pomodoroSlice"

const SettingsScreen = () => {
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

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _changeFocusTime = val => dispatch(changeFocusTime(val))
  const _changeShortBreak = val => dispatch(changeShortBreak(val))
  const _changeLongBreak = val => dispatch(changeLongBreak(val))
  const _changeWorkingSessions = val => dispatch(changeWorkingSessions(val))
  const _toggleAutoStartPomodoro = () => dispatch(toggleAutoStartPomodoro())
  const _toggleAutoStartBreak = () => dispatch(toggleAutoStartBreak())

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SettingsBarHeader settingsSectionName="Pomodoro Timer Settings" />
      <SettingSlider
        settingName="Focus time"
        settingValueUnitText="min"
        value={focusTime}
        onValueChange={val => _changeFocusTime(val)}
        minimumValue={5}
        maximumValue={60}
        step={5}
      />

      <SettingSlider
        settingName="Short break"
        settingValueUnitText="min"
        value={shortBreak}
        onValueChange={val => _changeShortBreak(val)}
        minimumValue={5}
        maximumValue={15}
        step={5}
      />

      <SettingSlider
        settingName="Long break"
        settingValueUnitText="min"
        value={longBreak}
        onValueChange={val => _changeLongBreak(val)}
        minimumValue={10}
        maximumValue={30}
        step={5}
      />

      <SettingSlider
        settingName="Working sessions"
        settingValueUnitText="sessions"
        value={workingSessions}
        onValueChange={val => _changeWorkingSessions(val)}
        minimumValue={1}
        maximumValue={12}
        step={1}
      />
      <SettingSwitch
        settingName="Auto start pomodoro?"
        switchValue={autoStartPomodoro}
        onValueChange={_toggleAutoStartPomodoro}
      />
      <SettingSwitch
        settingName="Auto start break?"
        switchValue={autoStartBreak}
        onValueChange={_toggleAutoStartBreak}
      />
    </ScrollView>
  )
}

export default React.memo(SettingsScreen)
