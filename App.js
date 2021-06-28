import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import  PomodoroSettingsScreen from './src/screens/Dasboard/Pomodoro/PomodoroSettingsScreen';
import TabsNav from './src/navigations/tabsNav';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

const customFonts = {
  MontserratReg: require("./src/assets/fonts/Montserrat-Regular.ttf"),
  MontserratSemiBold: require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
  MontserratBold: require("./src/assets/fonts/Montserrat-Bold.ttf"),
  OpenSansReg: require("./src/assets/fonts/OpenSans-Regular.ttf"),
  OpenSansSemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  OpenSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
}

const App = () => {
  const [isLoaded] = useFonts(customFonts)

  if (!isLoaded){
    return <AppLoading />
  };

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