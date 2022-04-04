import React from "react"
import { View, StyleSheet } from "react-native"
import FlexLayout from "../../components/Layouts/FlexLayout"
import Timer from "../../components/Timer/Timer"

// const pomodoroTimeValue = [  0.2, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,70, 80, 90,]
// const breaksTimeValue = [0.2, 2, 5, 10, 15, 20, 25, 30]

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    backgroundColor: "rgb(255,255,255)",
  },
})

export default class PomodoroScreen extends React.PureComponent {
  render() {
    return (
      <FlexLayout>
        <View style={styles.wrapper}>
          <Timer />
        </View>
      </FlexLayout>
    )
  }
}
