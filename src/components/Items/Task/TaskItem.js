/* eslint-disable no-unused-expressions */
import React, { useEffect, createRef } from "react"
import withObservables from "@nozbe/with-observables"
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"
import Icon from "react-native-vector-icons/MaterialIcons"
import { View, StyleSheet, Pressable } from "react-native"
import { format } from "date-fns"
import Checkbox from "../../Buttons/Checkbox"
import CheckboxPriority from "../../Buttons/CheckboxPriority"
import { TextMed, TextReg } from "../../Text/Text"
import TaskPage from "./TaskPage"

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 60,
    paddingHorizontal: 15,
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomColor: "rgb(245,245,245)",
    borderBottomWidth: 1,
  },
  wrapperTitle: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },

  wrapperPropertie: {
    height: 30,
    flexDirection: "row",
  },

  propertieName: {
    marginLeft: 5,
  },

  wrapperProperties: {
    marginTop: 5,
    flexDirection: "row",
  },
})

const TaskPropertie = ({
  propertieIcon,
  propertieName,
  propertieColor,
  style,
}) => {
  return (
    <View style={[styles.wrapperPropertie, { ...style }]}>
      <Icon name={propertieIcon} size={18} color={propertieColor} />
      <TextReg style={styles.propertieName}>{propertieName}</TextReg>
    </View>
  )
}

const TaskPropertieList = ({
  task,
  project,
  displayDeadline,
  displayDeadlineTime,
  displayProject,
}) => {
  return (
    <View style={styles.wrapperProperties}>
      {displayDeadline ? (
        <TaskPropertie
          style={{ marginRight: 10 }}
          propertieIcon="today"
          propertieName={[
            format(task.deadlineAt, "PP"),
            " ",
            displayDeadlineTime ? format(task.deadlineTimeAt, "p") : null,
          ]}
          propertieColor="#484848"
        />
      ) : null}
      {displayProject ? (
        <TaskPropertie
          propertieIcon="inbox"
          propertieName={project.name}
          propertieColor="#484848"
        />
      ) : null}
    </View>
  )
}

const TaskItem = ({
  task,
  project,
  displayProject,
  displayDeadline,
  displayDeadlineTime,
}) => {
  const isDeadline = task.deadlineAt && displayDeadline
  const isDeadlineTime = task.deadlineTimeAt && displayDeadlineTime
  const isProject = project && displayProject
  const isDisplayProperties = isDeadline || isProject
  const taskOpacity = useSharedValue(1)
  const taskPageRef = createRef()

  const doneTrueAnimation = () => {
    taskOpacity.value = withTiming(0.5, { duration: 400 })
  }

  const doneFalseAnimation = () => {
    taskOpacity.value = withTiming(1, { duration: 400 })
  }

  const taskStyle = useAnimatedStyle(() => ({
    opacity: taskOpacity.value,
  }))

  useEffect(() => {
    if (task.isDone === true) {
      doneTrueAnimation()
    } else {
      doneFalseAnimation()
    }
  }, [task.isDone])

  return (
    <>
      <Animated.View
        style={[styles.container, taskStyle]}
        entering={LightSpeedInLeft}
        exiting={LightSpeedOutRight}
      >
        <Pressable
          style={styles.wrapperTitle}
          onPress={() => taskPageRef.current.openTaskPage()}
        >
          <Checkbox
            status={task.isDone}
            onChange={() => task.handleIsDone()}
            size={24}
          />
          <TextMed style={styles.title}>{task.title}</TextMed>
          <CheckboxPriority
            status={task.isPriority}
            onChange={() => task.handleIsPriority()}
            size={26}
          />
        </Pressable>
        {isDisplayProperties ? (
          <TaskPropertieList
            task={task}
            project={project}
            displayProject={isProject}
            displayDeadline={isDeadline}
            displayDeadlineTime={isDeadlineTime}
          />
        ) : null}
      </Animated.View>
      <TaskPage task={task} project={project} ref={taskPageRef} />
    </>
  )
}

const enhance = withObservables(["task"], ({ task }) => ({
  task: task.observe(),
  project: task.project,
}))

export default enhance(TaskItem)
