/* eslint-disable import/no-named-as-default-member */
/* eslint-disable global-require */
import "react-native-gesture-handler"
import React, { useState, useEffect } from "react"
import SplashScreen from "react-native-splash-screen"
import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { setI18Config } from "./src/translations/translations"
import DrawerNav from "./src/navigations/DrawerNav"
import database from "./src/Database/Database"

const customFonts = {
  OpenSansReg: require("./src/assets/fonts/OpenSans-Regular.ttf"),
  OpenSansSemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  OpenSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
  OpenSansExtraBold: require("./src/assets/fonts/OpenSans-ExtraBold.ttf"),
  NexaBold: require("./src/assets/fonts/Nexa-Bold.otf"),
  MontserratRegular: require("./src/assets/fonts/Montserrat-Regular.ttf"),
  MontserratMedium: require("./src/assets/fonts/Montserrat-Medium.ttf"),
  MontserratSemiBold: require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
  MontserratBold: require("./src/assets/fonts/Montserrat-Bold.ttf"),
}

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoaded] = useFonts(customFonts)
  // eslint-disable-next-line no-unused-vars
  const [string, i18n] = useState(setI18Config())

  useEffect(() => {
    SplashScreen.hide()
    return () => {
      database.close()
    }
  }, [])

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    </>
  )
}

export default App
