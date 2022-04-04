import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Switch } from "react-native-paper"

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 60,
    paddingHorizontal: 13,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingNameStyle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 13,
    color: "rgb(36,36,36)",
  },
})

const SettingSwitch = ({ settingName, switchValue, onValueChange, style }) => (
  <View style={[styles.wrapper, { ...style }]}>
    <Text style={styles.settingNameStyle}>{settingName}</Text>
    <Switch value={switchValue} onValueChange={onValueChange} color="#53D3AF" />
  </View>
)

export default SettingSwitch
