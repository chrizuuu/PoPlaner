import React from "react"
import { ScrollView } from "react-native"
import PropTypes from "prop-types"
import TaskItem from "../Items/Task/TaskItem"

const TasksList = ({ tasks, displayProject }) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 60 }}
      style={[{ width: "100%" }]}
    >
      {tasks.map(task => (
        <TaskItem
          task={task}
          key={task.id}
          displayDeadline
          displayDeadlineTime
          displayProject={displayProject}
        />
      ))}
    </ScrollView>
  )
}

TasksList.defaultProps = {
  displayProject: true,
}

TasksList.propTypes = {
  tasks: PropTypes.instanceOf(Array).isRequired,
  displayProject: PropTypes.bool,
}

export default TasksList
