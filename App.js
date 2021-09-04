import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './src/navigations/drawerNav';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {setI18Config} from './src/translations/translations'
import TasksList from './src/screens/Dasboard/ToDo/TasksList';
import DrawerNavigator from './src/navigations/newdrawer';
import { navigationRef } from './src/navigations/newdrawer';

const customFonts = {
  OpenSansReg: require("./src/assets/fonts/OpenSans-Regular.ttf"),
  OpenSansSemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  OpenSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
  OpenSansExtraBold: require("./src/assets/fonts/OpenSans-ExtraBold.ttf"),
  NexaBold: require("./src/assets/fonts/Nexa-Bold.otf"),


}

const App = () => {
  const [isLoaded] = useFonts(customFonts)
  const [strings, i18n] = useState(setI18Config())

  if (!isLoaded){
    return <AppLoading />
  };

  return (
    <>
    <StatusBar/>
    <NavigationContainer >
      <DrawerNavigator />
    </NavigationContainer>
    </>
  );
}


export default App;