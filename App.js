/* eslint-disable global-require */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState } from "react"
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native"
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider"
import { StatusBar, LogBox } from "react-native"
// import PomodoroScreen from "./src/screens/Pomodoro/PomodoroScreen"
import { useFlipper } from "@react-navigation/devtools"
import { setI18Config } from "./src/translations/translations"
import Navigation from "./src/navigations/Navigation"
import { database } from "./src/database/database"

function App() {
  // eslint-disable-next-line no-unused-vars
  const [string, i18n] = useState(setI18Config())
  const navigationRef = useNavigationContainerRef()
  LogBox.ignoreLogs(["new NativeEventEmitter"])
  useFlipper(navigationRef)

  return (
    <DatabaseProvider database={database}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar />
        <Navigation />
      </NavigationContainer>
    </DatabaseProvider>
  )
}

export default App
