import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {setI18Config} from './src/translations/translations'
import DrawerNav from './src/navigations/DrawerNav';
import NotifService from './src/notification/NotificationConfig';
import SplashScreen from 'react-native-splash-screen';
import { strings } from './src/translations/translations';
import { startOfDay, endOfDay, isSameDay } from 'date-fns';
import realm from './src/Database/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customFonts = {
  OpenSansReg: require("./src/assets/fonts/OpenSans-Regular.ttf"),
  OpenSansSemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  OpenSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
  OpenSansExtraBold: require("./src/assets/fonts/OpenSans-ExtraBold.ttf"),
  NexaBold: require("./src/assets/fonts/Nexa-Bold.otf"),
}

const App = () => {
  const [isLoaded] = useFonts(customFonts)
  const [string, i18n] = useState(setI18Config())
  const [date,setDate] = useState(new Date())

  const notif = new NotifService();
  const tasks = realm.objects("Task")
  //notif.taskScheduleNotif()


  const onTasksChange = () => {
      const currDate = new Date()
      if (isSameDay(date,currDate) === false) {
        setDate(currDate)
      }
      const tasksDoneCurrDay = realm.objects("Task").filtered('deadlineDate >= $0 && deadlineDate <= $1 && isDone == true', startOfDay(currDate), endOfDay(currDate)).length
      const tasksCurrDay = realm.objects("Task").filtered('deadlineDate >= $0 && deadlineDate <= $1', startOfDay(currDate), endOfDay(currDate)).length
      if (tasksCurrDay != 0 && (tasksCurrDay - tasksDoneCurrDay) === 0){
        notif.taskPushNotif({
          title: strings("congratulations"),
          message: strings("doneAllTasks")
      })       
    }
  }


  useEffect(() => {
    tasks.addListener(onTasksChange)
    SplashScreen.hide();
    return () => {
      tasks.removeAllListeners()
    }
  }, [])
  

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

