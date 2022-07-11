/* eslint-disable no-unused-vars */
import React from "react"
import { View } from "react-native"
import withObservables from "@nozbe/with-observables"
import TaskDAO from "../../../../database/DAO/TaskDAO"
import TasksList from "../../../../components/List/TasksList"
import TextBold from "../../../../components/Text/TextBold"
import NewTaskButton from "../../../../components/Buttons/NewTaskButton"

function WeeklyCalendarTasks({ tasks, pickedDay }) {
  return (
    <>
      <TasksList tasks={tasks} />
      <NewTaskButton />
    </>
  )
}

const enhance = withObservables(["pickedDay"], props => ({
  tasks: TaskDAO.observeSpecificDayTasks(props.pickedDay),
}))

export default enhance(WeeklyCalendarTasks)
