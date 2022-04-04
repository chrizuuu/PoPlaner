/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import React from "react"
import { View, Pressable } from "react-native"
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator } from "@react-navigation/stack"

import Icon from "react-native-vector-icons/MaterialIcons"
import { format } from "date-fns"
import PomodoroScreen from "../screens/Pomodoro/PomodoroScreen"
import SettingsScreen from "../screens/SettingsScreen"
import InboxScreen from "../screens/TasksManager/InboxScreen"
import TodayTasksScreen from "../screens/TasksManager/TodayTasksScreen"
import PrioritiesScreen from "../screens/TasksManager/PrioritiesScreen"
import ProjectTasksScreen from "../screens/TasksManager/ProjectTasksScreen"
import { TextBold, TextMed } from "../components/Text/Text"
import NavigationProjectsList from "./NavigationProjectsList"

const Drawer = createDrawerNavigator()

const CustomDrawer = (props) => {
  const { state, navigation } = props

  /*
  useEffect(() => {
    let actualRoute = state.routes[state.index]

    while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index]
    }

    //  actualRoute = actualRoute.state.routes[actualRoute.state.index]
    console.log(actualRoute)
  }, [state])
*/
  const focusedCheck = (value) => {
    let actualRoute = state.routes[state.index]
    let actualRouteName = null

    while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index]
    }

    actualRouteName = actualRoute.name === "Drawer" ? "Inbox" : actualRoute.name
    if (value === actualRouteName) {
      return true
    }
    return false
  }

  return (
    <DrawerContentScrollView {...props} keyboardShouldPersistTaps="handled">
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          height: 48,
          alignItems: "center",
          paddingHorizontal: 15,
          borderBottomColor: "rgb(245,245,245)",
          borderBottomWidth: 1.5,
        }}
      >
        <TextBold fontSize={16}>{format(new Date(), "cccc, MMM do")}</TextBold>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              navigation.navigate("Settings")
            }}
          >
            <Icon size={24} color="#242424" name="settings" light />
          </Pressable>
        </View>
      </View>

      <DrawerItem
        style={{
          height: 50,
        }}
        focused={focusedCheck("Priorities")}
        label="Priorities"
        labelStyle={{ color: "#609806" }}
        icon={({ size }) => <Icon size={size} name="star" color="#000" />}
        onPress={() => {
          navigation.navigate("Priorities")
        }}
      />
      <DrawerItem
        style={{
          height: 50,
          justifyContent: "center",
        }}
        focused={focusedCheck("Today")}
        label="Today"
        labelStyle={{ color: "#609806" }}
        icon={({ size }) => <Icon size={size} name="today" color="#000" />}
        onPress={() => {
          navigation.navigate("Today")
        }}
      />
      <DrawerItem
        style={{
          height: 50,

          justifyContent: "center",
        }}
        focused={focusedCheck("Inbox")}
        label={({ color }) => <TextMed style={{ color }}>Inbox</TextMed>}
        labelStyle={{ color: "#609806" }}
        icon={({ size }) => <Icon size={size} name="inbox" color="#000" />}
        onPress={() => {
          navigation.navigate("Inbox")
        }}
      />
      <DrawerItem
        style={{
          height: 50,
          justifyContent: "center",
        }}
        focused={focusedCheck("Pomodoro Timer")}
        label="Pomodoro Timer"
        labelStyle={{ color: "#609806" }}
        icon={({ size }) => <Icon size={size} name="timelapse" color="#000" />}
        onPress={() => {
          navigation.navigate("Pomodoro Timer")
        }}
      />
      <NavigationProjectsList database state={state} />
    </DrawerContentScrollView>
  )
}

// const Stack = createNativeStackNavigator() // problem with header on Android
const Stack = createStackNavigator()
const StackDrawer = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: "#000",
        },
        headerLeft: () => (
          <Pressable
            style={{ paddingLeft: 15 }}
            onPress={() => navigation.openDrawer()}
          >
            <Icon color="#000" name="menu" size={24} />
          </Pressable>
        ),
        headerTitleAlign: "center",
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="Today" component={TodayTasksScreen} />
      <Stack.Screen name="Priorities" component={PrioritiesScreen} />
      <Stack.Screen name="Pomodoro Timer" component={PomodoroScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Project" component={ProjectTasksScreen} />
    </Stack.Navigator>
  )
}

const Navigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "100%",
        },
        drawerType: "slide",
      }}
    >
      <Drawer.Screen name="Drawer" component={StackDrawer} />
    </Drawer.Navigator>
  )
}

export default Navigation
