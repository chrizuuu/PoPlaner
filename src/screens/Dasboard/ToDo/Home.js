import React from "react"
import { View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

const Home = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate("Stack")
    })
  )

  return <View></View>
}

export default Home
