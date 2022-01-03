/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"
import PomodoroScreen from "./src/screens/Pomodoro/PomodoroScreen"
import { setI18Config } from "./src/translations/translations"

function App() {
  // eslint-disable-next-line no-unused-vars
  const [string, i18n] = useState(setI18Config())

  return (
    <NavigationContainer>
      <StatusBar />
      <PomodoroScreen />
    </NavigationContainer>
  )
}

export default App
