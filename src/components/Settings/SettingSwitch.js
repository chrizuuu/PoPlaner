import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { Switch } from "react-native-paper"

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 56,
    paddingHorizontal: 13,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingNameStyle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 13,
    color: "#242424",
  },
})

const SettingSwitch = ({ settingName, switchValue, onValueChange, style }) => (
  <View style={[styles.wrapper, { ...style }]}>
    <Text style={styles.settingNameStyle}>{settingName}</Text>
    <Switch value={switchValue} onValueChange={onValueChange} color="#53D3AF" />
  </View>
)

export default SettingSwitch
