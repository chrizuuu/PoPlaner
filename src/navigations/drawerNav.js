import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PomodoroScreen from '../screens/Dasboard/Pomodoro/PomodoroScreen';
import ScheduleScreen from '../screens/Dasboard/ToDo/ScheduleScreen';
import TasksList from '../screens/Dasboard/ToDo/TasksList';
import ProjectsListScreen from '../screens/Dasboard/ToDo/ProjectsListScreen';
import ProjectTasks from '../screens/Dasboard/ToDo/ProjectTasks';
import {getAllTasks,getPriorityTasks, getTasks} from '../Database/Database'
import { strings } from '../translations/translations';


import {Icon} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

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
            headerTitleAlign: 'center',
            headerStyle: {
                height:50,
            },
            headerTitleStyle: {
                fontFamily:'OpenSansBold',
                fontSize:16,
            },
            drawerIcon: ({focused, color, size }) => {
                let iconName;
                size = focused
                ? 24
                : 20
                
                if (route.name === 'Calendar') {
                    iconName = focused 
                        ? 'calendar'
                        : 'calendar-outline' 
                } 
                else if (route.name === 'Priority') {
                    iconName = focused 
                        ? 'star'
                        : 'star-outline';
                } 
                else if (route.name === 'Inbox') {
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
        <HomeTab.Screen 
            name="Priority"
            options={({ navigation, route }) => ({ 
                title: strings("headerTitlePriorityTasks"),    
            })}
        >
            {(props) => <TasksList {...props} tasksType={getPriorityTasks} priority={true} displayProjectProperty={true} />}        
        </HomeTab.Screen>

        <HomeTab.Screen 
            name="Inbox"
            options={({ navigation, route }) => ({ 
                title: strings("headerTitleAllTasks"),  
            })}
        >
            {(props) => <TasksList {...props} tasksType={getAllTasks} priority={false} displayProjectProperty={false} />}        
        </HomeTab.Screen>

        <HomeTab.Screen 
            name="Projects" 
            component={ProjectsListScreen}  
            options={({ navigation, route }) => ({ 
                title: strings("headerTitleProjects"),  
            })}
        />
        <HomeTab.Screen 
            name="Calendar" 
            component={ScheduleScreen} 
            options={{ title: strings("headerTitleCalendar") }}
        />
        <HomeTab.Screen 
            name="Pomodoro" 
            component={PomodoroScreen} 
            options={{ title: 'Pomodoro Timer' }}
        />
        <HomeTab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: strings("headerTitleProfile")}}
        />
    </HomeTab.Navigator>
  )
}

export default DrawerNav