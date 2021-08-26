import React from 'react';
import { View,Text,Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PomodoroScreen from '../screens/Dasboard/Pomodoro/PomodoroScreen';
import ScheduleScreen from '../screens/Dasboard/ScheduleScreen';
import ProfileScreen from '../screens/Dasboard/ProfileScreen';
import DashboardScreen from '../screens/Dasboard/DashboardScreen';
import TasksList from '../screens/Dasboard/ToDo/TasksList';
import ProjectsList from '../screens/Dasboard/ToDo/ProjectsList';
import realm, {getAllTasks,getPriorityTasks} from '../Database/Database'

import {Icon} from 'react-native-elements';

const HomeTab = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <HomeTab.Navigator
        keyboardDismissMode = 'null'
        detachInactiveScreens={false}
        screenOptions={({ route }) => ({
            drawerActiveTintColor: '#7393DD',
            drawerItemStyle:{
                width:'100%',
                marginLeft:0,
                marginTop:-4,
                padding:4
                
            },
            drawerLabelStyle: {
                fontFamily:'OpenSansSemiBold'
            },
            drawerIcon: ({focused, color, size }) => {
                let iconName;
                size = focused
                ? 24
                : 20

                if (route.name === 'Dashboard') {
                    iconName = focused 
                        ? 'home'
                        : 'home-outline';
                } 
                else if (route.name === 'Calendar') {
                    iconName = focused 
                        ? 'calendar'
                        : 'calendar-outline' 
                } 
                else if (route.name === 'Priority Tasks') {
                    iconName = focused 
                        ? 'star'
                        : 'star-outline';
                } 
                else if (route.name === 'All Tasks') {
                    iconName = focused 
                        ? 'list'
                        : 'list-outline';
                } 
                else if (route.name === 'Projects') {
                    iconName = focused 
                        ? 'flag'
                        : 'flag-outline';
                } 
                else if (route.name === 'Pomodoro') {
                    iconName = focused 
                        ? 'timer'
                        : 'timer-outline';
                } 
                else if (route.name === 'Profile') {
                    iconName = focused 
                        ? 'person'
                        : 'person-outline';
                }

                return <Icon type='ionicon' name={iconName} size={size} color={color} />;
            },
    })} >
        <HomeTab.Screen name="Dashboard" component={DashboardScreen} />
        <HomeTab.Screen name="Priority Tasks">
            {() => <TasksList tasksType={getPriorityTasks} />}        
        </HomeTab.Screen>
        <HomeTab.Screen name="All Tasks" > 
            {() => <TasksList tasksType={getAllTasks} />}        
        </HomeTab.Screen>
        <HomeTab.Screen name="Projects" component={ProjectsList}  />
        <HomeTab.Screen name="Calendar" component={ScheduleScreen} />
        <HomeTab.Screen name="Pomodoro" component={PomodoroScreen} />
        <HomeTab.Screen name="Profile" component={ProfileScreen} />
    </HomeTab.Navigator>
  )
}

export default DrawerNav