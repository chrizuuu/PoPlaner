/* eslint-disable react/jsx-props-no-spreading */

import React from "react"
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"

import { TouchableOpacity, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import PomodoroScreen from "../screens/Dasboard/Pomodoro/PomodoroScreen.js"
import ScheduleScreen from "../screens/Dasboard/ToDo/ScheduleScreen"
import TasksList from "../screens/Dasboard/ToDo/TasksList"
import ProjectTasks from "../screens/Dasboard/ToDo/ProjectTasks"
import ProjectsListScreen from "../screens/Dasboard/ToDo/ProjectsListScreen"
import { getAllTasks, getPriorityTasks } from "../Database/Database"
import { strings } from "../translations/translations"
import colors from "../styles/colorsLightTheme"

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const styles = StyleSheet.create({
  drawerItem: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: -3,
    padding: 5,
    borderRadius: 0,
  },
  drawerItemLabel: {
    fontFamily: "OpenSansSemiBold",
    color: colors.primeColor,
  },
})

const CustomDrawerContent = (props) => {
  const activeBackgroundColor = colors.sidebarSecondColor
  const { state } = props
  //  const { routes, index } = state

  const focusedCheck = (value) => {
    let actualRoute = state.routes[state.index]

    while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index]
    }
    if (value === actualRoute.name) {
      return true
    }
    return false
  }

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.sidebarPrimeColor }}
    >
      <DrawerItem
        style={styles.drawerItem}
        activeBackgroundColor={activeBackgroundColor}
        label={strings("headerTitlePriorityTasks")}
        labelStyle={styles.drawerItemLabel}
        icon={({ focused }) => (
          <Icon
            type="ionicon"
            color={focused ? "#53D3AF" : colors.primeColor}
            size={26}
            name={focused ? "star" : "star-outline"}
          />
        )}
        onPress={() => {
          props.navigation.navigate("Priority")
        }}
        focused={focusedCheck("Priority")}
      />
      <DrawerItem
        style={styles.drawerItem}
        label={strings("headerTitleAllTasks")}
        activeBackgroundColor={activeBackgroundColor}
        labelStyle={styles.drawerItemLabel}
        icon={({ focused }) => (
          <Icon
            type="ionicon"
            color={focused ? "#53D3AF" : colors.primeColor}
            size={26}
            name={focused ? "list" : "list-outline"}
          />
        )}
        onPress={() => {
          props.navigation.navigate("Inbox")
        }}
        focused={focusedCheck("Inbox")}
      />
      <DrawerItem
        style={styles.drawerItem}
        label={strings("headerTitleProjects")}
        activeBackgroundColor={activeBackgroundColor}
        labelStyle={styles.drawerItemLabel}
        icon={({ focused }) => (
          <Icon
            type="ionicon"
            color={focused ? "#53D3AF" : colors.primeColor}
            size={26}
            name={focused ? "flag" : "flag-outline"}
          />
        )}
        onPress={() => {
          props.navigation.navigate("Projects")
        }}
        focused={focusedCheck("Projects")}
      />
      <DrawerItem
        style={styles.drawerItem}
        label={strings("headerTitleCalendar")}
        activeBackgroundColor={activeBackgroundColor}
        labelStyle={styles.drawerItemLabel}
        icon={({ focused }) => (
          <Icon
            type="ionicon"
            color={focused ? "#53D3AF" : colors.primeColor}
            size={26}
            name={focused ? "calendar" : "calendar-outline"}
          />
        )}
        onPress={() => {
          props.navigation.navigate("Calendar")
        }}
        focused={focusedCheck("Calendar")}
      />
      <DrawerItem
        style={styles.drawerItem}
        label="Pomodoro"
        activeBackgroundColor={activeBackgroundColor}
        labelStyle={styles.drawerItemLabel}
        icon={({ focused }) => (
          <Icon
            type="ionicon"
            color={focused ? "#53D3AF" : colors.primeColor}
            size={26}
            name={focused ? "timer" : "timer-outline"}
          />
        )}
        onPress={() => {
          props.navigation.navigate("Pomodoro")
        }}
        focused={focusedCheck("Pomodoro")}
      />
    </DrawerContentScrollView>
  )
}

function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 11 }}
            onPress={() => navigation.openDrawer()}
          >
            <Icon type="ionicon" name="menu-outline" size={30} />
          </TouchableOpacity>
        ),
        animationEnabled: false,
        drawerItemStyle: {
          width: "100%",
          marginLeft: 0,
          marginTop: -4,
          padding: 4,
        },
        headerTitleAlign: "center",
        headerStyle: {
          height: 50,
          backgroundColor: "#F8F9FA",
        },
        headerTitleStyle: {
          fontFamily: "OpenSansBold",
          fontSize: 16,
        },
      })}
    >
      <Stack.Screen
        name="Pomodoro"
        component={PomodoroScreen}
        options={{ title: "Pomodoro Timer" }}
      />
      <Stack.Screen
        name="Priority"
        options={() => ({
          title: strings("headerTitlePriorityTasks"),
        })}
      >
        {(props) => (
          <TasksList
            {...props}
            tasksType={getPriorityTasks}
            priority
            displayProjectProperty
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Inbox"
        options={() => ({
          title: strings("headerTitleAllTasks"),
        })}
      >
        {(props) => (
          <TasksList
            {...props}
            tasksType={getAllTasks}
            priority={false}
            displayProjectProperty={false}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Projects"
        component={ProjectsListScreen}
        options={() => ({
          title: strings("headerTitleProjects"),
        })}
      />
      <Stack.Screen
        name="Calendar"
        component={ScheduleScreen}
        options={{ title: strings("headerTitleCalendar") }}
      />
      <Stack.Screen
        name="ProjectTasks"
        component={ProjectTasks}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  )
}

function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Stack" component={StackNavigator} />
    </Drawer.Navigator>
  )
}

export default DrawerNav
