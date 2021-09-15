import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification = (notification) => {
    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }
attachNotification = (handler) => {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  onNotification: handler.onNotification.bind(handler),
  popInitialNotification: true,
  requestPermissions: Platform.OS === 'ios',
});

export default handler;