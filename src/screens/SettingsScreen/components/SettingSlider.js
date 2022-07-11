import React, { useState } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import Slider from "@react-native-community/slider"
import { TextReg, TextSemi } from "../../../components/Text/Text"

const SettingSlider = ({
  settingName,
  onValueChange,
  settingValueUnitText,
  value,
  minimumValue,
  maximumValue,
  step,
}) => {
  const [sliderVisible, setSliderVisible] = useState(false)

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 13,
      backgroundColor: "rgb(255,255,255)",
    },
    wrapperSettingBar: {
      width: "100%",
      height: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    wrapperSlider: {
      height: 60,
      display: sliderVisible ? "flex" : "none",
    },
    wrapperSliderRange: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 13,
    },
  })

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setSliderVisible(!sliderVisible)}
        style={styles.wrapperSettingBar}
      >
        <TextSemi fontSize={13} color="#242424">
          {settingName}
        </TextSemi>
        <TextReg fontSize={13} color="#242424">
          {value} 
          {' '}
          {settingValueUnitText}
        </TextReg>
      </Pressable>
      <View style={styles.wrapperSlider}>
        <Slider
          style={{
            width: "100%",
            height: 20,
            opacity: sliderVisible ? 1 : 0,
          }}
          value={value}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          onValueChange={onValueChange}
          minimumTrackTintColor="rgb(83, 211, 175)"
          maximumTrackTintColor="rgba(83, 211, 175,0.8)"
          thumbTintColor="rgb(83, 211, 175)"
        />
        <View style={styles.wrapperSliderRange}>
          <TextReg fontSize={12} color="#484848">
            {minimumValue}
            {settingValueUnitText}
          </TextReg>
          <TextReg fontSize={12} color="#484848">
            {maximumValue}
            {settingValueUnitText}
          </TextReg>
        </View>
      </View>
    </View>
  )
}

export default SettingSlider
