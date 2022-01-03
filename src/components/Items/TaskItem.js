import React from "react"
import { Icon } from "react-native-vector-icons"
import withObservables from "@nozbe/with-observables"
import { View, Text, StyleSheet } from "react-native"
import Checkbox from "../Buttons/Checkbox"
import CheckboxPriority from "../Buttons/CheckboxPriority"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 50,
    paddingHorizontal: 15,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomColor: "rgb(245,245,245)",
    borderBottomWidth: 1,
  },
  wrapper: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    fontFamily: "OpenSansMedium",
    color: "#000",
    flex: 1,
  },

  wrapperPropertie: {
    height: 30,
    flexDirection: "row",
  },

  propertieName: {
    marginLeft: 5,
    fontFamily: "OpenSansReg",
    color: "#000",
    fontSize: 12,
  },

  wrapperProperties: {
    marginLeft: 30,
    flexDirection: "row",
  },
})

function TaskPropertie({ propertieIcon, propertieName, propertieColor }) {
  return (
    <View style={styles.wrapperPropertie}>
      <Icon name={propertieIcon} size={18} color={propertieColor} />
      <Text style={styles.propertieName}>{propertieName}</Text>
    </View>
  )
}

function TaskProperties({ task, displayDeadlineAt, displayProject }) {
  return (
    <View style={styles.wrapperProperties}>
      {displayDeadlineAt ? (
        <TaskPropertie
          propertieIcon="calendar-today"
          propertieName={task.createdAt.toLocaleDateString()}
          propertieColor="#484848"
        />
      ) : null}
      {displayProject ? (
        <TaskPropertie
          propertieIcon="outlined-flag"
          propertieName={task.project.name}
          propertieColor="#484848"
        />
      ) : null}
    </View>
  )
}
// const TaskItemPage = ({ task }) => <View /> modal of Task

function TaskItem({ task, displayProject, displayDeadlineAt }) {
  const isDeadline = task.deadlineAt && displayDeadlineAt
  const isProject = task.project && displayProject
  const isDisplayProperties = isDeadline || isProject

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Checkbox status={task.isDone} onChange={() => task.handleIsDone()} />
        <Text style={styles.title}>{task.title}</Text>
        <CheckboxPriority
          status={task.isPriority}
          onChange={() => task.handleIsPriority()}
        />
      </View>
      {isDisplayProperties ? (
        <TaskProperties
          task={task}
          displayProjet={isProject}
          displayDeadlineAt={isDeadline}
        />
      ) : null}
    </View>
  )
}

const enhance = withObservables(["task"], ({ task }) => ({
  task: task.observe(),
  project: task.project,
}))

export default enhance(TaskItem)
