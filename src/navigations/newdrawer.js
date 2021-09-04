import React,{useState,useEffect} from "react";
import {createDrawerNavigator ,  DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import { useNavigationState,useRoute } from '@react-navigation/native'    

import PomodoroScreen from "../screens/Dasboard/Pomodoro/PomodoroScreen";
import ScheduleScreen from "../screens/Dasboard/ToDo/ScheduleScreen";
import TasksList from "../screens/Dasboard/ToDo/TasksList";
import ProjectTasks from "../screens/Dasboard/ToDo/ProjectTasks";
import ProjectsListScreen from "../screens/Dasboard/ToDo/ProjectsListScreen";
import {getAllTasks,getPriorityTasks, getProjectTasks} from "../Database/Database"
import { strings } from "../translations/translations";
import { TouchableOpacity,Text,StyleSheet,ScrollView,View } from "react-native";
import {Icon,Button} from "react-native-elements";

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const CustomDrawerContent = (props) => {
/*  
  const getCurrentRouteName = () => {
    let _index = props.state.index;
    let _routeName = props.state;
    return  _routeName.routes[0].state
}

console.log(getCurrentRouteName())
*/

const { state } = props
const { routes, index } = state; 
const focusedRoute = routes[index]

const focusedCheck = value => {
  let actualRoute = state.routes[state.index];

  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
      console.log(actualRoute.name)
  }
  if (value === actualRoute.name){
    return true
  }
  else { 
    return false
  }
}


const focusChecker = (value) => focusedRoute === value? true : false
   return (
      <DrawerContentScrollView {...props}>   
      
        <DrawerItem
          label={strings("headerTitlePriorityTasks")}
          labelStyle={{fontFamily:"OpenSansSemiBold"}}
          icon={({ color, size }) => <Icon type="ionicon" color={color} size={20} name={"star-outline"} />}
          onPress={() => {
            props.navigation.navigate("Priority");
          }}
          focused={focusedCheck("Priority")}
        />
        <DrawerItem
          label={strings("headerTitleAllTasks")}
          labelStyle={{fontFamily:"OpenSansSemiBold"}}
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"list-outline"} />}
          onPress={() => {
            props.navigation.navigate("Inbox");
          }}
          focused={focusedCheck("Inbox")}
        />  
        <DrawerItem
          label={strings("headerTitleProjects")}
          labelStyle={{fontFamily:"OpenSansSemiBold"}}
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"flag-outline"} />}
          onPress={() => {
            props.navigation.navigate("Projects");
          }}
          focused={focusedCheck("Projects")}
        />
        <DrawerItem
          label={strings("headerTitleCalendar")}
          labelStyle={{fontFamily:"OpenSansSemiBold"}}
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"calendar-outline"} />}
          onPress={() => {
            props.navigation.navigate("Calendar");
          }}
          focused={focusedCheck("Calendar")}
        />  
        <DrawerItem
          label="Pomodoro"
          labelStyle={{fontFamily:"OpenSansSemiBold"}}
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"timer-outline"} />}
          onPress={() => {
            props.navigation.navigate("Pomodoro");
          }}
          focused={focusedCheck("Pomodoro")}
        />     
      </DrawerContentScrollView>
    );
  }

  
 
function StackNavigator({navigation}) {
  
    return (
      <Stack.Navigator   
        screenOptions={({ route }) => ({
          headerLeft: () =>
            (<TouchableOpacity style={{marginLeft:11}} onPress={() => navigation.openDrawer()}>
                    <Icon type="ionicon" name="menu-outline"size={30}/>
            </TouchableOpacity>
          ),
          animationEnabled: false,
          drawerActiveTintColor: "#7393DD",
          drawerItemStyle:{
              width:"100%",
              marginLeft:0,
              marginTop:-4,
              padding:4
              
          },
          headerTitleAlign: "center",
          headerStyle: {
              height:50,
          },
          headerTitleStyle: {
              fontFamily:"OpenSansBold",
              fontSize:16,
          },
        })} >

        <Stack.Screen
            name="Priority"
            options={({ navigation, route }) => ({ 
                title: strings("headerTitlePriorityTasks"),    
            })}
        >
            {(props) => <TasksList {...props} tasksType={getPriorityTasks} priority={true} displayProjectProperty={true} />}    
        </Stack.Screen>
        <Stack.Screen
            name="Inbox"
            options={({ navigation, route }) => ({ 
                title: strings("headerTitleAllTasks"),  
            })}
        >
            {(props) => <TasksList {...props} tasksType={getAllTasks} priority={false} displayProjectProperty={false} />}        
        </Stack.Screen>
        <Stack.Screen 
            name="Projects" 
            component={ProjectsListScreen}  
            options={({ navigation, route }) => ({ 
                title: strings("headerTitleProjects"),  
            })}
        />
        <Stack.Screen 
            name="Calendar" 
            component={ScheduleScreen} 
            options={{ title: strings("headerTitleCalendar") }}
        />
        <Stack.Screen 
            name="Pomodoro" 
            component={PomodoroScreen} 
            options={{ title: "Pomodoro Timer" }}
        />
        <Stack.Screen 
          name="ProjectTasks"
          component={ProjectTasks}
          options={({ route }) => ({ 
            title: route.params.title,
          })}
        />
        
      </Stack.Navigator>
    );
  }
  
  function DrawerNavigator({navigation}) {

    return (
      <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}        
      >
        <Drawer.Screen name="Stack" component={StackNavigator} />
      </Drawer.Navigator>
    );
  }

  export default DrawerNavigator