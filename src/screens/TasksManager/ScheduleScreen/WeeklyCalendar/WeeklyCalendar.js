/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent */
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  startOfWeek,
} from "date-fns"
import React, { useState, useEffect } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { TextReg, TextBold } from "../../../../components/Text/Text"

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#fff",
    height: 80,
  },
  dayWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    height: 60,
    width: 38,
    padding: 2,
  },
  isPickedDay: {
    backgroundColor: "#53D3AF",
    borderRadius: 10,
  },
})

function WeeklyCalendar({ pickedDay, onClickOnDate }) {
  const [weekDays, setWeekDays] = useState([])

  useEffect(() => {
    const firstDayOfWeek = startOfWeek(pickedDay, { weekStartsOn: 1 })
    const lastDayOfWeek = endOfWeek(pickedDay, { weekStartsOn: 1 })
    const dayInverval = eachDayOfInterval({
      start: firstDayOfWeek,
      end: lastDayOfWeek,
    })
    setWeekDays(dayInverval)
  }, [pickedDay])

  const isPickedDay = day => {
    return isSameDay(day, pickedDay)
  }

  return (
    <View style={[styles.wrapper]}>
      {weekDays.map(day => (
        <Pressable
          onPress={() => onClickOnDate(day)}
          style={[styles.dayWrapper, isPickedDay(day) && styles.isPickedDay]}
          key={day}>
          <TextBold>{format(day, "d")}</TextBold>
          <TextReg>{format(day, "iii")}</TextReg>
        </Pressable>
      ))}
    </View>
  )
}

export default WeeklyCalendar
