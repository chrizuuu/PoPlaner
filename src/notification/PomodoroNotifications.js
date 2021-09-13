import notifee, { AndroidImportance } from '@notifee/react-native';
import {strings} from "../translations/translations"


async function pomodoroShortBreakNotification() {
    const channelId = await notifee.createChannel({
        id: "timer",
        name: 'Pomodoro Timer notification',
        lights: false,
        vibration: true,
        importance: AndroidImportance.HIGH,
      });

    // Display a notification
    await notifee.displayNotification({
        id: "pomodoroBreak",
        title: '<p style="color: #53D3AF;"><b>' + strings("timeUp") + '</span></p></b></p> &#8987;',
        body: strings("takeAShortBreak"), 
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
        },
    });
  }

  async function pomodoroLongBreakNotification() {
    const channelId = await notifee.createChannel({
        id: "timer",
        name: 'Pomodoro Timer notification',
        lights: false,
        vibration: true,
        importance: AndroidImportance.HIGH,
      });

    // Display a notification
    await notifee.displayNotification({
        id: "pomodoroBreak",
        title: '<p style="color: #53D3AF;"><b>' + strings("timeUp") + '</span></p></b></p> &#9749;',
        body: strings("takeALongBreak"), 
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
        },
    });
  }

  async function pomodoroStartWorkNotification() {
    const channelId = await notifee.createChannel({
        id: "timer",
        name: 'Pomodoro Timer notification',
        lights: false,
        vibration: true,
        importance: AndroidImportance.HIGH,
      });

    // Display a notification
    await notifee.displayNotification({
        id: "pomodoroWork",
        title: '<p style="color: #EE5436;"><b>' + strings("endBreak") + '</span></p></b></p> &#9203;',
        body: strings("backToWork"), 
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
        },
    });
  }


  async function cancel(notificationId) {
    await notifee.cancelNotification(notificationId);
  }

  export {
    pomodoroShortBreakNotification,
    pomodoroLongBreakNotification,
    pomodoroStartWorkNotification,
    cancel
  }