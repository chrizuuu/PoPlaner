import React, { useState } from "react"
import { ScrollView } from "react-native"
import SettingsBarHeader from "../../components/Settings/SettingsHeaderBar"
import SettingSwitch from "../../components/Settings/SettingSwitch"
import SettingSlider from "../../components/Settings/SettingSlider"

const SettingsScreen = () => {
  const [testValue, setTestValue] = useState(true)

  return (
    <ScrollView>
      <SettingsBarHeader settingsSectionName="Pomodoro Timer Settings" />
      <SettingSlider
        settingName="Focus time"
        settingValueUnitText="min"
        value={25}
        minimumValue={5}
        maximumValue={60}
        step={5}
      />

      <SettingSlider
        settingName="Short break"
        settingValueUnitText="min"
        value={5}
        minimumValue={2}
        maximumValue={30}
        step={1}
      />

      <SettingSlider
        settingName="Long break"
        settingValueUnitText="min"
        value={15}
        minimumValue={2}
        maximumValue={30}
        step={1}
      />

      <SettingSlider
        settingName="Working sessions"
        settingValueUnitText="session"
        value={4}
        minimumValue={1}
        maximumValue={12}
        step={1}
      />

      <SettingSwitch
        settingName="Auto start pomodoro?"
        switchValue={testValue}
        onValueChange={setTestValue}
      />
      <SettingSwitch
        settingName="Auto start break?"
        switchValue={testValue}
        onValueChange={setTestValue}
      />

      <SettingsBarHeader
        settingsSectionName="Notifications"
        style={{ marginTop: 10 }}
      />

      <SettingSwitch
        settingName="Allow notifications?"
        switchValue={testValue}
        onValueChange={setTestValue}
      />
      <SettingSwitch
        settingName="Sounds"
        switchValue={testValue}
        onValueChange={setTestValue}
      />
      <SettingSwitch
        settingName="Pomodoro timer notifications"
        switchValue={testValue}
        onValueChange={setTestValue}
      />
      <SettingSwitch
        settingName="Tasks notifications"
        switchValue={testValue}
        onValueChange={setTestValue}
      />

      <SettingsBarHeader
        settingsSectionName="Night mode"
        style={{ marginTop: 10 }}
      />

      <SettingSwitch
        settingName="Night mode"
        switchValue={testValue}
        onValueChange={setTestValue}
      />
      <SettingSwitch
        settingName="Automatically?"
        switchValue={testValue}
        onValueChange={setTestValue}
        style={{ marginBottom: 40 }}
      />
    </ScrollView>
  )
}

export default SettingsScreen
