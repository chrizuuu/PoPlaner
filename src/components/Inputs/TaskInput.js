/* eslint-disable no-param-reassign */
import React, { useState, useRef, forwardRef, useImperativeHandle } from "react"
import {
  Platform,
  View,
  Modal,
  StyleSheet,
  Pressable,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { TextReg, TextBold } from "../Text/Text"
import DateTimeInput from "./DateTimeInput"
import { strings } from "../../translations/translations"
import TaskDAO from "../../database/DAO/TaskDAO"
import { database } from "../../database/database"
import CheckboxPriority from "../Buttons/CheckboxPriority"
import ProjectPicker from "./ProjectPicker"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const TaskInput = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [projectPickerVisible, setProjectPickerVisible] = useState(false)
  const [inputTitle, setInputTitle] = useState("")
  const [inputPriority, setInputPriority] = useState(false)
  const [inputTitleValidation, setInputTitleValidation] = useState(true)
  const [inputDesc, setInputDesc] = useState("")
  const [inputProject, setInputProject] = useState(null)

  // states for inputDate and inputTime
  const [inputDate, setInputDate] = useState(null)
  const [inputTime, setInputTime] = useState(null)
  const inputRef = useRef()

  const clearInput = () => {
    setInputTitleValidation(true)
    setInputTitle("")
    setInputPriority(false)
    setInputDesc("")
    setInputDate(null)
    setInputTime(null)
    setInputProject(null)
  }

  const openProjectPicker = () => {
    setModalVisible(false)
    setProjectPickerVisible(true)
  }

  const pickProject = (value) => {
    setInputProject(value)
    setProjectPickerVisible(false)
    setModalVisible(true)
  }

  useImperativeHandle(ref, () => ({
    openTaskInput: () => {
      setInputTitleValidation(true)
      setModalVisible(true)
      setTimeout(
        () => inputRef.current?.focus(),
        Platform.OS === "ios" ? 0 : 250
      )
    },
  }))

  const submitTask = () => {
    if (inputTitle !== "" && inputTitle.trim().length > 0) {
      TaskDAO.createTask(
        inputTitle,
        inputProject,
        inputPriority,
        inputDate,
        inputTime,
        inputDesc
      )
      clearInput()
      setModalVisible(false)
    } else {
      setInputTitleValidation(false)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  const onChangeInputTitle = (value) => {
    setInputTitleValidation(true)
    setInputTitle(value)
  }
  const onChangeInputDesc = (value) => setInputDesc(value)
  const onChangeDate = (value) => setInputDate(value)
  const onChangeTime = (value) => setInputTime(value)
  const handleInputPriority = () => setInputPriority(!inputPriority)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marign: 0,
      width: windowWidth,
      height: windowHeight,
      justifyContent: "flex-end",
      alignContent: "flex-end",
    },
    backdrop: {
      flex: 1,
      backgroundColor: "black",
      opacity: 0.3,
    },
    wrapper: {
      paddingTop: 10,
      paddingBottom: Platform.OS === "ios" ? 5 : 0,
      backgroundColor: "rgb(255,255,255)",
    },
    inputTitle: {
      height: 36,
      paddingTop: 0,
      paddingBottom: 0,
      paddingHorizontal: 15,
      fontSize: 18,
      fontFamily: "OpenSans-Medium",
      color: "#000",
    },
    inputDesc: {
      minHeight: 24,
      paddingHorizontal: 15,
      fontSize: 14,
      fontFamily: "OpenSans-Medium",
      color: "#000",
    },
    projectPropertie: {
      flexDirection: "row",
      alignItems: "center",
      height: 40,
      marginTop: 10,
      marginBottom: 5,
      paddingHorizontal: 15,
    },
    wrapperFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 40,
      paddingHorizontal: 15,
      borderTopColor: "rgb(245,245,245)",
      borderTopWidth: 1,
    },
    wrapperProperties: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    wrapperDateProp: {
      flexDirection: "row",
      alignItems: "center",
      height: 30,
    },
  })

  return (
    <>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <>
            <Pressable
              style={styles.backdrop}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.wrapper}>
              <TextInput
                placeholder={strings("taskInputTitle")}
                style={styles.inputTitle}
                maxLength={50}
                value={inputTitle}
                ref={inputRef}
                onChangeText={(value) => onChangeInputTitle(value)}
                onSubmitEditing={() => submitTask()}
              />

              {inputTitleValidation === false ? (
                <TextReg
                  fontSize={13}
                  style={{ color: "#EE5436", paddingHorizontal: 15 }}
                >
                  {strings("taskInvalidInputTitle")}
                </TextReg>
              ) : null}

              <TextInput
                placeholder={strings("taskInputDesc")}
                style={styles.inputDesc}
                maxLength={1000}
                multiline
                value={inputDesc}
                onChangeText={(value) => onChangeInputDesc(value)}
              />

              <Pressable
                style={styles.projectPropertie}
                onPress={() => openProjectPicker()}
              >
                <Icon name="inbox" color="#484848" size={18} />
                <TextReg style={{ marginLeft: 5 }}>
                  {inputProject
                    ? inputProject.name
                    : strings("taskInputProjectEmpty")}
                </TextReg>
              </Pressable>

              <View style={styles.wrapperFooter}>
                <View style={styles.wrapperProperties}>
                  <CheckboxPriority
                    status={inputPriority}
                    onChange={() => handleInputPriority()}
                    size={22}
                    style={{ paddingRight: 15 }}
                    color="#484848"
                  />
                  <View style={styles.wrapperDateProp}>
                    <DateTimeInput
                      value={inputDate}
                      onChange={onChangeDate}
                      typeValue="date"
                      formatValue="PP"
                      displayMode={Platform.OS === "ios" ? "inline" : null}
                      style={{ paddingRight: 15 }}
                    />

                    {inputDate ? (
                      <DateTimeInput
                        value={inputTime}
                        onChange={onChangeTime}
                        typeValue="time"
                        formatValue="p"
                      />
                    ) : null}
                  </View>
                </View>
                <Pressable onPress={() => submitTask()}>
                  <TextBold>{strings("create")}</TextBold>
                </Pressable>
              </View>
            </View>
          </>
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
            <Pressable style={styles.backdrop} onPress={() => pickProject()} />
            <View style={styles.wrapper}>
              <ProjectPicker database={database} pickProject={pickProject} />
            </View>
          </>
        </KeyboardAvoidingView>
      </Modal>
    </>
  )
})

TaskInput.displayName = "TaskInput"

export default TaskInput
