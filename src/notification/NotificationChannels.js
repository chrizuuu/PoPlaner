import notifee, { AndroidImportance } from '@notifee/react-native';

await notifee.createChannel({
  id: "task",
  name: 'Tasks notification',
  lights: false,
  vibration: true,
  importance: AndroidImportance.DEFAULT,
});

await notifee.createChannel({
    id: "timer",
    name: 'Pomodoro Timer notification',
    lights: false,
    vibration: true,
    importance: AndroidImportance.HIGH,
  });