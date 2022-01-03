import React from "react"
import { Pressable, StyleSheet } from "react-native"
import { Icon } from "react-native-vector-icons"
import colors from "../../styles/colorsLightTheme"

function Checkbox({ status, onChange, style }) {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderRadius: 25,
      borderColor: colors.thirdColor,
      height: 24,
      width: 24,
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
      <Icon name="done" size={18} style={iconStatusChanger} />
    </Pressable>
  )
}

export default Checkbox
