import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PomodoroScreen from '../screens/Dasboard/Pomodoro/PomodoroScreen';
import ScheduleScreen from '../screens/Dasboard/ScheduleScreen';
import ProfileScreen from '../screens/Dasboard/ProfileScreen';
import DashboardScreen from '../screens/Dasboard/DashboardScreen';
import ToDoDashboard from '../screens/Dasboard/ToDo/ToDoDashboard';

import {Icon} from 'react-native-elements';

const HomeTab = createBottomTabNavigator();

const TabsNav = () => {
  return (
    <HomeTab.Navigator
    tabBarOptions={{
      style: {
        borderTopWidth:0,
        elevation:0,
        paddingBottom:10,
      },
      activeTintColor:'#1976D2',
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') {
          iconName = 'home';
        } else if (route.name === 'Schedule') {
          iconName = 'calendar-today' 
        } else if (route.name === 'Todo') {
          iconName = 'format-list-bulleted';
        } else if (route.name === 'Pomodoro') {
          iconName = 'timer';
        } else if (route.name === 'Profile') {
          iconName = 'person';
        }
        return <Icon type='material' name={iconName} size={size} color={color} />;
      },
    })} >
      <HomeTab.Screen name="Dashboard" component={DashboardScreen} />
      <HomeTab.Screen name="Schedule" component={ScheduleScreen} />
      <HomeTab.Screen name="Todo" component={ToDoDashboard} />
      <HomeTab.Screen name="Pomodoro" component={PomodoroScreen} />
      <HomeTab.Screen name="Profile" component={ProfileScreen} />
    </HomeTab.Navigator>
  )
}

export default TabsNav;