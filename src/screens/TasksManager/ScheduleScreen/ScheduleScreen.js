/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { View } from "react-native"
import WeeklyCalendarHeader from "./WeeklyCalendar/WeeklyCalendarHeader"
import WeeklyCalendar from "./WeeklyCalendar/WeeklyCalendar"
import WeeklyCalendarTasks from "./WeeklyCalendar/WeeklyCalendarTasks"

const ScheduleScreen = () => {
  const [pickedDay, setPickedDay] = useState(new Date())

  return (
    <>
      <WeeklyCalendarHeader
        pickedDay={pickedDay}
        onChangeDay={val => setPickedDay(val)}
      />
      <WeeklyCalendar
        pickedDay={pickedDay}
        onClickOnDate={val => setPickedDay(val)}
      />
      <WeeklyCalendarTasks pickedDay={pickedDay} />
    </>
  )
}

export default ScheduleScreen
