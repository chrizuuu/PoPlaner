import React from "react";
import {createDrawerNavigator ,  DrawerContentScrollView,DrawerItemList,DrawerItem} from "@react-navigation/drawer";
import {createStackNavigator} from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import PomodoroScreen from "../screens/Dasboard/Pomodoro/PomodoroScreen";
import ScheduleScreen from "../screens/Dasboard/ScheduleScreen";
import ProfileScreen from "../screens/Dasboard/ProfileScreen";
import TasksList from "../screens/Dasboard/ToDo/TasksList";
import ProjectTasks from "../screens/Dasboard/ToDo/ProjectTasks";
import ProjectsListScreen from "../screens/Dasboard/ToDo/ProjectsListScreen";
import {getAllTasks,getPriorityTasks, getProjectTasks} from "../Database/Database"
import { strings } from "../translations/translations";
import { TouchableOpacity,Text } from "react-native";
import realm from "../Database/Database";
import {Icon,Button} from "react-native-elements";
import { TextInput } from "react-native";

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function CustomDrawerContent({...props}) {
  const {state} = props
  const {routes, index} = state; 
   return (
      <DrawerContentScrollView {...props}>   
        <DrawerItem
          label={strings("headerTitlePriorityTasks")}
          labelStyle={{fontFamily:"OpenSansSemiBold"}}
          icon={({ color, size }) => <Icon type="ionicon" color={color} size={20} name={"star-outline"} />}
          onPress={() => {
            props.navigation.navigate("Priority");
          }}
        />
        <DrawerItem
          label={strings("headerTitleAllTasks")}
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"list-outline"} />}
          onPress={() => {
            props.navigation.navigate("Inbox");
          }}
        />  
        <DrawerItem
          label={strings("headerTitleProjects")}
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"flag-outline"} />}
          onPress={() => {
            props.navigation.navigate("Projects");
          }}
        />
        <DrawerItem
          label={strings("headerTitleCalendar")}
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"calendar-outline"} />}
          onPress={() => {
            props.navigation.navigate("Calendar");
          }}
        />  
        <DrawerItem
          label="Pomodoro"
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"timer-outline"} />}
          onPress={() => {
            props.navigation.navigate("Pomodoro");
          }}
        />   
        <DrawerItem
          label="Profile"
          icon={({ focused, color, size }) => <Icon type="ionicon" color={color} size={20} name={"person-outline"} />}
          onPress={() => {
            props.navigation.navigate("Profile");
          }}
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
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: strings("headerTitleProfile")}}
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
  
  function DrawerNavigator({navigation, route}) {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          activeBackgroundColor: "#7393DD",
          inactiveBackgroundColor:'green'
        }}        
      >
        <Drawer.Screen name="Stack" component={StackNavigator} />
      </Drawer.Navigator>
    );
  }

  export default DrawerNavigator