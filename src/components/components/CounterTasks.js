import React, { useState } from "react"
import { Text, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import realm from "../../Database/realm"
import PropTypes from "prop-types"

const CounterTasks = ({ project, backgroundColor }) => {
  const [countResult, setCountResult] = useState(
    realm
      .objects("Task")
      .filtered("project._id == $0 AND isDone = false", project).length
  )

  const styles = StyleSheet.create({
    text: {
      fontFamily: "OpenSansBold",
      textAlign: "center",
      backgroundColor: backgroundColor,
      height: 20,
      width: 20,
      borderRadius: 25,
    },
  })
  useFocusEffect(
    React.useCallback(() => {
      setCountResult(
        realm
          .objects("Task")
          .filtered("project._id == $0 AND isDone = false", project).length
      )
    })
  )

  return <Text style={styles.text}>{countResult}</Text>
}

CounterTasks.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  project: PropTypes.isRequired,
}

export default CounterTasks
