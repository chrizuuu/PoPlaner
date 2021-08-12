import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabsNav from './src/navigations/tabsNav';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

const customFonts = {
  NexaBold: require("./src/assets/fonts/Nexa-Bold.otf"),
  OpenSansReg: require("./src/assets/fonts/OpenSans-Regular.ttf"),
  OpenSansSemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  OpenSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
  OpenSansExtraBold: require("./src/assets/fonts/OpenSans-ExtraBold.ttf"),

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
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


export default App;