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
import { strings } from "../../translations/translations"
import ProjectDAO from "../../database/DAO/ProjectDAO"
import { TextBold, TextReg, TextSemi } from "../Text/Text"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ProjectInput = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [inputName, setInputName] = useState("")
  const [validInputStatus, setStatus] = useState(true)
  const inputRef = useRef(null)

  const clearInput = () => {
    setStatus(true)
    setInputName("")
  }

  useImperativeHandle(ref, () => ({
    openProjectInput: () => {
      setModalVisible(true)
      setTimeout(
        () => inputRef.current.focus(),
        Platform.OS === "ios" ? 0 : 250
      )
    },
  }))

  const closeProjectInput = () => {
    clearInput()
    setModalVisible(false)
  }

  const submitProject = () => {
    if (inputName !== "" && inputName.trim().length > 0) {
      ProjectDAO.createProject(inputName)
      closeProjectInput()
    } else {
      setStatus(false)
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }

  const onChangeInputName = (value) => {
    setStatus(true)
    setInputName(value)
  }

  const styles = StyleSheet.create({
    container: {
      marign: 0,
      width: windowWidth,
      height: windowHeight,
      justifyContent: "flex-end",
      alignContent: "flex-end",
      flex: 1,
    },
    wrapper: {
      paddingBottom: 30,
      backgroundColor: "rgb(255,255,255)",
    },

    wrapperHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 50,
      paddingHorizontal: 15,
      borderBottomColor: "rgb(245,245,245)",
      borderBottomWidth: 2,
    },

    inputName: {
      fontSize: 18,
      height: 36,
      fontFamily: "OpenSans-Regular",
      paddingTop: 0,
      paddingBottom: 0,
      color: "#000",
      paddingHorizontal: 15,
    },

    backdrop: {
      backgroundColor: "black",
      opacity: 0.3,
      flex: 1,
    },
  })

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
      transparent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => {
            closeProjectInput()
          }}
        />
        <View style={styles.wrapper}>
          <View style={styles.wrapperHeader}>
            <Icon
              color="#000"
              name="clear"
              size={24}
              onPress={() => closeProjectInput()}
            />
            <TextBold fontSize={16}>{strings("projectInputHeader")}</TextBold>
            <Icon
              color="#000"
              name="done"
              size={24}
              onPress={() => submitProject()}
            />
          </View>

          <TextSemi
            fontSize={16}
            style={{
              paddingHorizontal: 15,
              paddingTop: 20,
              paddingBottom: 10,
              textTransform: "uppercase",
            }}
          >
            {strings("projectInputName")}
          </TextSemi>

          <TextInput
            placeholder={strings("projectTypeInputName")}
            style={styles.inputName}
            maxLength={30}
            value={inputName}
            ref={inputRef}
            onChangeText={(value) => onChangeInputName(value)}
          />

          {validInputStatus === false ? (
            <TextReg
              fontSize={13}
              style={{ color: "#EE5436", paddingHorizontal: 15 }}
            >
              {strings("projectInvalidInputName")}
            </TextReg>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
})

ProjectInput.displayName = "ProjectInput"

export default ProjectInput
