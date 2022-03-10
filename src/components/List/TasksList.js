import React, { useRef } from "react"
import { StyleSheet, View, FlatList } from "react-native"
import PropTypes from "prop-types"
import TaskItem from "../Items/Task/TaskItem"
import TaskInput from "../Inputs/TaskInput"
import FooterList from "../Components/FooterList"

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
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              key={item.id}
              displayDeadline
              displayDeadlineTime
              displayProject={displayProject}
            />
          )}
        />

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
