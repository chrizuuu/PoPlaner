/* eslint-disable no-unused-vars */
import React from "react"
import { View } from "react-native"
import withObservables from "@nozbe/with-observables"
import TaskDAO from "../../../../database/DAO/TaskDAO"
import TasksList from "../../../../components/List/TasksList"
import TextBold from "../../../../components/Text/TextBold"

function WeeklyCalendarTasks({ tasks, tasksWithTime }) {
  return (
    <View style={{ height: "100%" }}>
      <TextBold>Your schedule</TextBold>
      <TasksList tasks={tasksWithTime} />
      <TextBold>Other tasks</TextBold>
      <TasksList tasks={tasks} />
    </View>
  )
}

const enhance = withObservables(["pickedDay"], props => ({
  tasks: TaskDAO.observeSpecificDayTasks(props.pickedDay),
  tasksWithTime: TaskDAO.observeSpecificDayTasksWithTime(props.pickedDay), // set global var in mobx to query
}))

export default enhance(WeeklyCalendarTasks)
