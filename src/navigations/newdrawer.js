import React from 'react';
import {createDrawerNavigator ,  DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import PomodoroScreen from '../screens/Dasboard/Pomodoro/PomodoroScreen';
import ScheduleScreen from '../screens/Dasboard/ScheduleScreen';
import ProfileScreen from '../screens/Dasboard/ProfileScreen';
import TasksList from '../screens/Dasboard/ToDo/TasksList';
import TasksList2 from '../screens/Dasboard/ToDo/TasksList2';
import ProjectsListScreen from '../screens/Dasboard/ToDo/ProjectsListScreen';
import {getAllTasks,getPriorityTasks, getProjectTasks} from '../Database/Database'
import { strings } from '../translations/translations';
import { TouchableOpacity,Text } from 'react-native';
import realm from '../Database/Database';
import {Icon,Button} from 'react-native-elements';

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}
      >   
        <DrawerItem
          label="Priority"
          icon={() => <Icon type='ionicon' name='flag' size={24} />}
          onPress={() => {
            props.navigation.navigate('Priority');
          }}
        />
        <DrawerItem
          label="Inbox"
          onPress={() => {
            props.navigation.navigate('Inbox');
          }}
        />  
        <DrawerItem
          label="Projects"
          onPress={() => {
            props.navigation.navigate('Projects');
          }}
        />
        <DrawerItem
          label="Calendar"
          onPress={() => {
            props.navigation.navigate('Calendar');
          }}
        />  
        <DrawerItem
          label="Pomodoro"
          onPress={() => {
            props.navigation.navigate('Pomodoro');
          }}
        />   
          
       {realm.objects("Project").filtered("visible == true").map((project) =>
          <DrawerItem
            key={project._id}
            label={project.title}
            onPress={({navigation}) => {
              props.navigation.dispatch(
                CommonActions.navigate({
                  name: 'ProjectTasks',
                  key: project._id.toString(),
                  params: {
                    projectId:project._id,
                    priority:false,
                    displayProjectProperty:false,
                  },
                })
              );
            }}
          />
        )}    
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
            </TouchableOpacity>)
        ,
          animationEnabled: false,
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
            options={{ title: 'Pomodoro Timer' }}
        />
        <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ title: strings("headerTitleProfile")}}
        />
        <Stack.Screen 
          name="ProjectTasks"
          component={TasksList2}
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
          animationEnabled: false,
        }}        
      >
        <Drawer.Screen name="Stack" component={StackNavigator} />
      </Drawer.Navigator>
    );
  }

  export default DrawerNavigator