import NotifService from "../notification/NotificationConfig"
import { AppRegistry } from "react-native"
const notif = new NotifService()

const pomodoroNotif = async ({id,title,message}) => {
    notif.pomodoroPushNotif({
        id:id,
        title:title,
        message:message,
    })
}

AppRegistry.registerHeadlessTask('pomodoroNotif', () => pomodoroNotif);

export {pomodoroNotif}
  