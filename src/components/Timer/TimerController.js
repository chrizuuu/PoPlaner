import React from "react"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import InLineLayout from "../Layouts/InLineLayout"
import colors from "../../styles/colorsLightTheme"

const TimerController = ({ handleTimer, reset, skip, isPlaying, style }) => {
  const styles = StyleSheet.create({
    normalBtn: {
      width: 72,
      height: 72,
    },
    smallBtn: {
      borderColor: "#EFF1F4",
      borderWidth: 1,
      height: 54,
      width: 54,
    },
    buttonControls: {
      fontSize: 16,
      justifyContent: "center",
      borderRadius: 50,
      margin: 10,
    },
  })

  const backgroundColorChanger = isPlaying === true ? "#EE5436" : "#53D3AF"
  return (
    <View style={[{ ...style }]}>
      <InLineLayout>
        <TouchableOpacity
          style={[styles.buttonControls, styles.smallBtn]}
          onPress={reset}
        >
          <Icon
            type="material"
            name="replay"
            iconStyle={{ color: "#C3C5CA" }}
            size={36}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonControls,
            styles.normalBtn,
            { backgroundColor: backgroundColorChanger },
          ]}
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
          style={[styles.buttonControls, styles.smallBtn]}
          onPress={skip}
        >
          <Icon name="skip-next" iconStyle={{ color: "#C3C5CA" }} size={36} />
        </TouchableOpacity>
      </InLineLayout>
    </View>
  )
}
export default TimerController
