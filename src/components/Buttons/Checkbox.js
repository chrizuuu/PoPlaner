import React from "react"
import { Pressable, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

function Checkbox({ status, onChange, style, size }) {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderRadius: 25,
      borderColor: "rgb(210,210,210)",
      justifyContent: "center",
      alignItems: "center",
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
      onPressOut={() => onChange()}
      style={[styles.container, { ...style }]}
    >
      <Icon name="done" size={size} style={iconStatusChanger} />
    </Pressable>
  )
}

export default Checkbox
