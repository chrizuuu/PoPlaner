import React from "react"
import withObservables from "@nozbe/with-observables"
import TasksList from "../../components/List/TasksList"
import TaskDAO from "../../database/DAO/TaskDAO"
import NewTaskButton from "../../components/Buttons/NewTaskButton"

const InboxScreen = ({ tasks }) => {
  return (
    <>
      <TasksList tasks={tasks} />
      <NewTaskButton />
    </>
  )
}

const enhance = withObservables([], () => ({
  tasks: TaskDAO.observeInboxTasks(), // set global var in mobx to query
}))

export default enhance(React.memo(InboxScreen))
