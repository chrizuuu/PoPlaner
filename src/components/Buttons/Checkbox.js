import React from "react"
import { Pressable, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import colors from "../../styles/colorsLightTheme"

const CheckBox = ({ status, onChange, style }) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderRadius: 25,
      borderColor: colors.thirdColor,
      height: 28,
      width: 28,
    },

    true: {
      opacity: 1,
    },

    false: {
      opacity: 0,
    },
  })

  const iconStatusChanger = status === true ? styles.true : styles.false

  return (
    <Pressable
      onPress={() => onChange()}
      style={[styles.container, { ...style }]}
    >
      <Icon name="done" style={iconStatusChanger} />
    </Pressable>
  )
}

export default CheckBox
