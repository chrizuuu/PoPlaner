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
    fontFamily: "Montserrat-Bold",
    color: "rgb(36,36,36)",
  },
})

const SettingsBarHeader = ({ settingsSectionName, style }) => (
  <View style={[styles.wrapper, { ...style }]}>
    <Text style={styles.settingsName}>{settingsSectionName}</Text>
  </View>
)

export default SettingsBarHeader
