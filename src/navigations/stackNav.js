import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PomodoroScreen from './src/screens/Dasboard/Pomodoro/PomodoroScreen';
import {Icon} from 'react-native-elements';

const HomeTab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <HomeTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
  
        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home';
        } else if (route.name === 'Pomodoro') {
          iconName = focused ? 'timer' : 'timer';
        }
        return <Icon type='material' name={iconName} size={size} color={color} />;
      },
    })} >
      <HomeTab.Screen name="Pomodoro" component={PomodoroScreen} />
    </HomeTab.Navigator>
  )
}

const Stack = createStackNavigator();

const TabsNav = () => {
  return (
    <>
    <StatusBar/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false,}}>
        <Stack.Screen name="HomeTab" component={HomeTabs}/>
        <Stack.Screen name="Pomodoro Settings" component={PomodoroSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


export default TabsNav;