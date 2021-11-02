import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import colors from "../../styles/colorsLightTheme"

const TaskPropertyOnList = ({ icon, propertyName }) => {
  const styles = StyleSheet.create({
    textProperty: {
      fontSize: 11,
      fontFamily: "OpenSansReg",
      color: colors.textColor,
      overflow: "hidden",
      marginLeft: 5,
    },

    propertyContainer: {
      flexDirection: "row",
      marginTop: 4,
      marginRight: 10,
    },
  })

  return (
    <View style={styles.propertyContainer}>
      <Icon name={icon} size={14} />
      <Text numberOfLines={1} style={styles.textProperty}>
        {propertyName}
      </Text>
    </View>
  )
}

export default TaskPropertyOnList
