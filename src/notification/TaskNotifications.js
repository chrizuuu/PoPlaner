import notifee, { IntervalTrigger, TriggerType,TimeUnit } from '@notifee/react-native';


async function onCreateTriggerNotification() {

  const channelId = await notifee.createChannel({
    id: "timer",
    name: 'Pomodoro Timer notification',
    lights: false,
    vibration: true,
    importance: AndroidImportance.HIGH,
  });

  const date = new Date(Date.now());
  date.setHours(11);
  date.setMinutes(10);

  const trigger = IntervalTrigger = {
    type: TriggerType.INTERVAL,
    interval: 1,
    timeUnit: TimeUnit.MINUTES
  };

await notifee.createTriggerNotification(
  {
    id: '123',
    title: 'Meeting with Jane',
    body: 'Today at 11:20am',
    android: {
      channelId,
    },
  },
  trigger,
);
}

export {
  onCreateTriggerNotification
}