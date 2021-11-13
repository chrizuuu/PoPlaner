import React from "react"
import { StyleSheet, View, Text } from "react-native"

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 13,
  },
  settingsName: {
    fontSize: 14,
    fontFamily: "MontserratBold",
    color: "#242424",
  },
})

const SettingsBarHeader = ({ settingsSectionName, style }) => (
  <View style={[styles.wrapper, { ...style }]}>
    <Text style={styles.settingsName}>{settingsSectionName}</Text>
  </View>
)

export default SettingsBarHeader
