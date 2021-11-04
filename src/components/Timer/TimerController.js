import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import colors from "../../styles/colorsLightTheme"

const TimerController = ({ handleTimer, reset, skip, isPlaying }) => {
  // const widthDevice = Dimensions.get("window").width
  const backgroundColorChanger = isPlaying === true ? "#EE5436" : "#53D3AF"

  const styles = StyleSheet.create({
    buttonStyle: {
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
      backgroundColor: "#fff", // to change
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
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[styles.buttonStyle, styles.smallBtn]}
          onPress={reset}
        >
          <Icon name="replay" iconStyle={{ color: "#C3C5CA" }} size={36} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonStyle, styles.normalBtn]}
          onPress={handleTimer}
        >
          <Icon
            type="material"
            name={isPlaying === true ? "pause" : "play-arrow"}
            iconStyle={{ color: colors.primeColor }}
            size={48}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonStyle, styles.smallBtn]}
          onPress={skip}
        >
          <Icon name="skip-next" iconStyle={{ color: "#C3C5CA" }} size={36} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default TimerController
