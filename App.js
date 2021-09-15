import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {setI18Config} from './src/translations/translations'
import DrawerNav from './src/navigations/DrawerNav';
import NotifService from "./src/notification/NotificationConfig"
import realm from './src/Database/Database';
import {startOfDay,endOfDay} from 'date-fns';


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

  const notif = new NotifService()

  const date = new Date()

  notif.taskScheduleNotif({
    title: "Masz" +  realm.objects("Task").filtered('deadlineDate >= $0 && deadlineDate <= $1', startOfDay(date), endOfDay(date)).length + "do zrobienia",
    message:realm.objects("Task").filtered('deadlineDate >= $0 && deadlineDate <= $1', startOfDay(date), endOfDay(date)).toString() ,
    notificationDate: new Date(),
  })

  if (!isLoaded){
    return <AppLoading />
  };
  return (
    <>
    <StatusBar/>
    <NavigationContainer >
      <DrawerNav />
    </NavigationContainer>
    </>
  );
}


export default App;

