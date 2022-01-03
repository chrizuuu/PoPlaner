import React, { useRef } from "react"
import { StyleSheet, Dimensions, View } from "react-native"
import withObservables from "@nozbe/with-observables"
import TaskItem from "../Items/TaskItem"
import FooterList from "../Components/FooterList"
import TaskDAO from "../../database/DAO/TaskDAO"

const windowHeight = Dimensions.get("window").height

function TasksList({ tasks }) {
  const inputTaskRef = useRef(null)

  const showTaskInput = () => {
    inputTaskRef.current.addFormSetVisible()
  }

  const styles = StyleSheet.create({
    tasksListContainer: {
      flex: 1,
      width: "100%",
      height: windowHeight,
      backgroundColor: "#fff",
    },
  })

  return (
    <View style={styles.tasksListContainer}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} displayDeadlineAt displayProject />
      ))}
      <FooterList leftIcon="add-outline" leftIconOnPress={showTaskInput} />
    </View>
  )
}

const enhance = withObservables([], () => ({
  tasks: TaskDAO.observeTasks(),
}))

export default enhance(TasksList)
