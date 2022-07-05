import "react-native-gesture-handler"
import React from "react"
import { AppRegistry } from "react-native"
import { Provider } from "react-redux"
import AppContainer from "./App"
import { name as appName } from "./app.json"
import store from "./src/redux/store"

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent(appName, () => App)
