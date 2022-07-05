import "react-native-gesture-handler"
import React from "react"
import { AppRegistry } from "react-native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import AppContainer from "./App"
import { name as appName } from "./app.json"
import { store, persistor } from "./src/redux/store"

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => App)
