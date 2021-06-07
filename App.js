import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import  PomodoroSettingsScreen from './src/screens/Dasboard/Pomodoro/PomodoroSettingsScreen';
import TabsNav from './src/navigations/tabsNav';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <StatusBar/>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false,}}>
        <Stack.Screen name="HomeTab" component={TabsNav}/>
        <Stack.Screen name="Pomodoro Settings" component={PomodoroSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


export default App;