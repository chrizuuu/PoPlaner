import { format } from "date-fns"
import React from "react"
import { View, StyleSheet, Platform } from "react-native"
import DateTimeInput from "../../../../components/Inputs/DateTimeInput"
import TextBold from "../../../../components/Text/TextBold"

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 48,
    paddingHorizontal: 15,
  },
})

function WeeklyCalendarHeader({ pickedDay, onChangeDay }) {
  return (
    <View style={[styles.wrapper]}>
      <TextBold fontSize={18}>{format(pickedDay, "d MMMM")}</TextBold>
      <DateTimeInput
        value={pickedDay}
        onChange={onChangeDay}
        typeValue="date"
        formatValue="PP"
        displayMode={Platform.OS === "ios" ? "inline" : null}
      />
    </View>
  )
}
export default WeeklyCalendarHeader
