import React from 'react';
import { View,Text,Button } from 'react-native';
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
      showLabel:false,
      activeTintColor:'#7393DD',
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({focused, color, size }) => {
        let iconName;
        size = focused
          ? 32
          : 24

        if (route.name === 'Dashboard') {
          iconName = focused 
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Schedule') {
          iconName = focused 
            ? 'calendar'
            : 'calendar-outline' 
        } else if (route.name === 'Todo') {
          iconName = focused 
            ? 'list'
            : 'list-outline';
        } else if (route.name === 'Pomodoro') {
          iconName = focused 
            ? 'timer'
            : 'timer-outline';
        } else if (route.name === 'Profile') {
          iconName = focused 
            ? 'person'
            : 'person-outline';
        }

        return <Icon type='ionicon' name={iconName} size={size} color={color} />;
      },
    })} >
      <HomeTab.Screen name="Dashboard" component={DashboardScreen} />
      <HomeTab.Screen name="Todo" component={ToDoDashboard} />
      <HomeTab.Screen name="Schedule" component={ScheduleScreen} />
      <HomeTab.Screen name="Pomodoro" component={PomodoroScreen} />
      <HomeTab.Screen name="Profile" component={ProfileScreen} />
    </HomeTab.Navigator>
  )
}

export default TabsNav;