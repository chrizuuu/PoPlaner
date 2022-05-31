import React from "react"
import { View, StyleSheet } from "react-native"
import FlexLayout from "../../components/Layouts/FlexLayout"
import Timer from "../../components/Timer/Timer"

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
