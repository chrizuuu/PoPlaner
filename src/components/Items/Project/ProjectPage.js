import React, { useState, forwardRef, useImperativeHandle } from "react"
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
  Keyboard,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { format } from "date-fns"
import { database } from "../../../database/database"
import { TextReg } from "../../Text/Text"
import { strings } from "../../../translations/translations"

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const ProjectPage = forwardRef((props, ref) => {
  const { project } = props
  const navigation = useNavigation()
  const [isVisible, setVisible] = useState(false)
  const [projectName, setProjectName] = useState(null)
  const [isInputFocus, setInputFocus] = useState(false)

  const deleteProject = () => {
    navigation.replace("Today")
    database.write(async () => {
      await project.delete()
    })
  }

  const deleteProjectAlert = () =>
    Alert.alert(
      strings("deleteProjectAlertTitle"),
      strings("deleteProjectAlertPart1") +
        project.name +
        strings("deleteProjectAlertPart2"),
      [
        {
          text: strings("deleteProjectAlertCancel"),
          onPress: () => null,
        },
        {
          text: strings("deleteProjectAlertDelete"),
          onPress: () => {
            deleteProject()
          },
        },
      ]
    )

  const onChangeTitle = (value) => setProjectName(value)

  const closeProjectPage = () => {
    project.changeName(projectName)
    setVisible(false)
  }

  useImperativeHandle(ref, () => ({
    openProjectPage: () => {
      setProjectName(project.name)
      setVisible(true)
    },
  }))

  const backdropPressHandler = () => {
    switch (isInputFocus) {
      case true:
        setInputFocus(false)
        Keyboard.dismiss()
        break
      case false:
        closeProjectPage()
        break
      default:
        closeProjectPage()
    }
  }

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
      paddingBottom: 25,
      paddingTop: 15,
      paddingHorizontal: 15,
      backgroundColor: "rgb(255,255,255)",
      minHeight: "25%",
      justifyContent: "space-between",
    },
    wrapperTitle: {
      flexDirection: "row",
      alignItems: "center",
      height: 50,
      marginBottom: 10,
      borderBottomColor: "rgb(245,245,245)",
      borderBottomWidth: 2,
    },
    wrapperFotter: {
      height: 24,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    title: {
      flex: 1,
      marginLeft: 10,
      fontSize: 22,
      color: "#000",
      fontFamily: "OpenSans-Bold",
    },
  })

  return (
    <Modal animationType="fade" visible={isVisible} transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Pressable style={styles.backdrop} onPress={backdropPressHandler} />
        <View style={styles.wrapper}>
          <View style={styles.wrapperTitle}>
            <TextInput
              onPressIn={() => setInputFocus(true)}
              placeholder={strings("taskInputTitle")}
              style={styles.title}
              maxLength={30}
              defaultValue={project.title}
              value={projectName}
              onChangeText={(value) => onChangeTitle(value)}
            />
          </View>
          <View style={styles.wrapperFotter}>
            <TextReg>
              {strings("taskCreatedAt") + format(project.createdAt, "PP")}
            </TextReg>
            <Pressable onPress={() => deleteProjectAlert()}>
              <Icon name="delete-outline" size={18} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
})

ProjectPage.displayName = "ProjectItemPage"

export default ProjectPage
