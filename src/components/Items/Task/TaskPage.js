import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import Icon from "react-native-vector-icons/MaterialIcons"
import {
  Alert,
  View,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Platform,
  Dimensions,
} from "react-native"
import { format } from "date-fns"
import { TextReg } from "../../Text/Text"
import Checkbox from "../../Buttons/Checkbox"
import CheckboxPriority from "../../Buttons/CheckboxPriority"
import { strings } from "../../../translations/translations"
import DateTimeInput from "../../Inputs/DateTimeInput"
import ProjectPicker from "../../Inputs/ProjectPicker"
import { database } from "../../../database/database"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const TaskPage = forwardRef((props, ref) => {
  const { task, project } = props
  const [isVisible, setVisible] = useState(false)
  const [taskTitle, setTaskTitle] = useState(null)
  const [taskIsDone, setTaskIsDone] = useState(null)
  const [taskPriority, setTaskPriority] = useState(null)
  const [taskProject, setTaskProject] = useState(null)
  const [projectPickerVisible, setProjectPickerVisible] = useState(false)
  const [taskDesc, setTaskDesc] = useState(null)
  const [taskDeadline, setTaskDeadline] = useState(null)
  const [taskDeadlineTime, setTaskDeadlineTime] = useState(null)

  const onChangeDate = (value) => setTaskDeadline(value)
  const onChangeTime = (value) => setTaskDeadlineTime(value)
  const onChangeTitle = (value) => setTaskTitle(value)
  const onChangeDesc = (value) => setTaskDesc(value)

  const closeTaskPage = () => {
    task.updateTask(
      taskTitle,
      taskIsDone,
      taskPriority,
      taskProject,
      taskDesc,
      taskDeadline,
      taskDeadlineTime
    )
    setVisible(false)
  }

  const alertTaskIsDone = () =>
    Alert.alert("Task is done.", "", [
      {
        text: "OK",
        onPress: () => closeTaskPage(),
      },
      {
        text: "Undo",
        onPress: () => {
          setTaskIsDone(false)
        },
      },
    ])

  useEffect(() => {
    if (taskIsDone === true) {
      alertTaskIsDone()
    }
  }, [taskIsDone])

  const openProjectPicker = () => {
    setVisible(false)
    setProjectPickerVisible(true)
  }

  const closeProjectPicker = () => {
    setProjectPickerVisible(false)
    setVisible(true)
  }

  const pickProject = (value) => {
    setTaskProject(value)
    closeProjectPicker()
  }

  useImperativeHandle(ref, () => ({
    openTaskPage: () => {
      setTaskTitle(task.title)
      setTaskIsDone(task.isDone)
      setTaskPriority(task.isPriority)
      setTaskProject(project)
      setTaskDesc(task.desc)
      setTaskDeadline(task.deadlineAt)
      setTaskDeadlineTime(task.deadlineTimeAt)
      setVisible(true)
    },
  }))

  const styles = StyleSheet.create({
    backdrop: {
      backgroundColor: "black",
      opacity: 0.3,
      flex: 1,
    },
    container: {
      marign: 0,
      width: windowWidth,
      height: windowHeight,
      justifyContent: "flex-end",
      alignContent: "flex-end",
      flex: 1,
    },
    wrapper: {
      paddingBottom: Platform.OS === "ios" ? 25 : 0,
      paddingTop: 15,
      paddingHorizontal: 15,
      backgroundColor: "rgb(255,255,255)",
    },
    wrapperTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 40,
    },

    wrapperDate: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    wrapperFotter: {
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    title: {
      flex: 1,
      marginLeft: 10,
      fontSize: 18,
      fontFamily: "OpenSans-Medium",
    },
    desc: {
      minHeight: 24,
      marginBottom: 15,
      fontSize: 16,
      fontFamily: "OpenSans-Regular",
    },
  })

  return (
    <>
      <Modal animationType="fade" visible={isVisible} transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Pressable style={styles.backdrop} onPress={closeTaskPage} />
          <View style={styles.wrapper}>
            <View style={styles.wrapperTitle}>
              <Checkbox
                status={taskIsDone}
                onChange={() => setTaskIsDone(!taskIsDone)}
                size={28}
              />
              <TextInput
                placeholder={strings("taskInputTitle")}
                style={styles.title}
                maxLength={50}
                defaultValue={task.title}
                value={taskTitle}
                onChangeText={(value) => onChangeTitle(value)}
              />
              <CheckboxPriority
                status={taskPriority}
                onChange={() => setTaskPriority(!taskPriority)}
                size={28}
              />
            </View>
            <TextInput
              placeholder={strings("taskInputDesc")}
              style={styles.desc}
              maxLength={1000}
              multiline
              value={taskDesc}
              onChangeText={(value) => onChangeDesc(value)}
            />
            <View>
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 35,
                }}
                onPress={() => openProjectPicker()}
              >
                <Icon name="inbox" color="#484848" size={18} />
                <TextReg style={{ marginLeft: 5 }}>
                  {taskProject
                    ? taskProject.name
                    : strings("taskInputProjectEmpty")}
                </TextReg>
              </Pressable>
              <View style={styles.wrapperDate}>
                <DateTimeInput
                  value={taskDeadline}
                  onChange={onChangeDate}
                  typeValue="date"
                  formatValue="PP"
                  displayMode={Platform.OS === "ios" ? "inline" : null}
                  style={{ marginRight: 15 }}
                />
                {taskDeadline ? (
                  <DateTimeInput
                    value={taskDeadlineTime}
                    onChange={onChangeTime}
                    typeValue="time"
                    formatValue="p"
                  />
                ) : (
                  <View />
                )}
              </View>
            </View>
            <View style={styles.wrapperFotter}>
              <TextReg>
                {strings("taskCreatedAt") + format(task.createdAt, "PP")}
              </TextReg>
              <Pressable onLongPress={() => task.delete()}>
                <Icon name="delete-outline" size={22} />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="fade"
        visible={projectPickerVisible}
        onRequestClose={() => setProjectPickerVisible(false)}
        transparent
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <>
            <Pressable
              style={styles.backdrop}
              onPress={() => closeProjectPicker()}
            />
            <View style={styles.wrapper}>
              <ProjectPicker database={database} pickProject={pickProject} />
            </View>
          </>
        </KeyboardAvoidingView>
      </Modal>
    </>
  )
})

TaskPage.displayName = "TaskItemPage"

export default TaskPage
