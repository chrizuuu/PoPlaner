import React, { useRef } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import PropTypes from "prop-types"
import TaskItem from "../Items/Task/TaskItem"
import TaskInput from "../Inputs/TaskInput"
import FooterList from "./FooterList"

const TasksList = ({ tasks, displayProject }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
  })

  const taskInputRef = useRef()
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={[{ width: "100%" }]}>
          {tasks.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              displayDeadline
              displayDeadlineTime
              displayProject={displayProject}
            />
          ))}
        </ScrollView>

        <FooterList
          leftIcon="add"
          leftIconOnPress={() => {
            taskInputRef.current.openTaskInput()
          }}
        />
      </View>
      <TaskInput ref={taskInputRef} />
    </>
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
