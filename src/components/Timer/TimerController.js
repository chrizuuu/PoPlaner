/* eslint-enable react/prop-types */

import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import colors from "../../styles/colorsLightTheme"

const TimerController = ({ handleTimer, reset, skip, isPlaying, style }) => {
  const backgroundColorChanger = isPlaying === true ? "#EE5436" : "#53D3AF"

  const styles = StyleSheet.create({
    btn: {
      fontSize: 16,
      justifyContent: "center",
      borderRadius: 50,
      margin: 10,
    },
    normalBtn: {
      width: 72,
      height: 72,
      backgroundColor: backgroundColorChanger,
    },
    smallBtn: {
      height: 54,
      width: 54,
      backgroundColor: "#fff",
      borderWidth: 2,
      borderColor: "rgb(245,245,245)",
    },

    container: {
      width: "100%",
    },
    wrapper: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  })

  return (
    <View style={[styles.container, { ...style }]}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={[styles.btn, styles.smallBtn]} onPress={reset}>
          <Icon name="replay" iconStyle={{ color: "#C3C5CA" }} size={36} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.normalBtn]}
          onPress={handleTimer}
        >
          <Icon
            type="material"
            name={isPlaying === true ? "pause" : "play-arrow"}
            iconStyle={{ color: colors.primeColor }}
            size={48}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.smallBtn]} onPress={skip}>
          <Icon name="skip-next" iconStyle={{ color: "#C3C5CA" }} size={36} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default TimerController
