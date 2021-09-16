import PushNotification, {Importance} from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';
import {strings} from "../translations/translations"

export default class NotifService {
  constructor(onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();
    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }

  createDefaultChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "task-notification", // (required)
        channelName: `Task notification`, // (required)
        importance: Importance.DEFAULT, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true,
      },
    );
    PushNotification.createChannel(
      {
        channelId: "pomodoro-notification", // (required)
        channelName: `Pomodoro notification`, // (required)
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, 
      },
    );
  }

  popInitialNotification = () => {
    PushNotification.popInitialNotification((notification));
  }

  pomodoroPushNotif = ({id,title,message,ticker}) => {
    this.lastId++;
    PushNotification.localNotification({
      channelId: "pomodoro-notification", // (required) channelId, if the channel doesn't exist, notification will not trigger.
      id: id? id : this.lastId,
      title: title, // (optional)
      message:message,// (required)
      ticker: ticker, // (optional)
      color: "#53D3AF", // (optional) default: system default
      smallIcon: "ic_small_icon", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      largeIcon: "", // (optional) default: "ic_launcher". Use "" for no large icon.
      autoCancel: true, // (optional) default: true
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      visibility: "private", // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      soundName: "default",
  })}

  taskPushNotif = ({title,message,ticker}) => {
    this.lastId++;
    PushNotification.localNotification({
      channelId: "task-notification", // (required) channelId, if the channel doesn't exist, notification will not trigger.
      title: title, // (optional)
      message:message,// (required)
      ticker: ticker, // (optional)
      color: "#53D3AF", // (optional) default: system default
      smallIcon: "ic_small_icon", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      largeIcon: "", // (optional) default: "ic_launcher". Use "" for no large icon.
      autoCancel: true, // (optional) default: true
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      visibility: "private", // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      soundName: "default",
  })}

  taskScheduleNotif = ({title,message,ticker}) => {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 30), // in 30 secs

      /* Android Only Properties */
      channelId: "task-notification",
      title: title, // (optional)
      message:message,// (required)
      ticker: ticker, // (optional)

      color: "#53D3AF",
      smallIcon: "ic_small_icon", 
      autoCancel: true, // (optional) default: true
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      repeatType:`day`,
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
      soundName: 'default', 
      visibility:"public",
    });
  }
  cancelSpecificNotif = (id) => {
    PushNotification.cancelLocalNotification(id)
  }

  cancelLastNotif = () => {
    PushNotification.cancelLocalNotification(this.lastId);
  }

  cancelAll = () => {
    PushNotification.cancelAllLocalNotifications();
  }

}