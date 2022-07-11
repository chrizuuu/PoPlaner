import React, { useRef } from "react"
import { StyleSheet, Pressable } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import TaskInput from "../Inputs/TaskInput"

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    right: 15,
    bottom: 25,
    zIndex: 99999,
    width: 48,
    height: 48,
    backgroundColor: "#53D3AF",
  },
})

function NewTaskButton() {
  const taskInputRef = useRef()
  return (
    <>
      <Pressable
        onPress={() => taskInputRef.current.openTaskInput()}
        style={[styles.buttonContainer]}
      >
        <Icon name="add" size={28} color="#fff" />
      </Pressable>
      <TaskInput ref={taskInputRef} />
    </>
  )
}

export default NewTaskButton
