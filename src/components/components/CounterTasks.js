import React, { useState } from "react"
import { Text, StyleSheet } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import PropTypes from "prop-types"
import database from "../../Database/Database"

const CounterTasks = ({ project, backgroundColor }) => {
  const [countResult, setCountResult] = useState(
    database
      .objects("Task")
      .filtered("project._id == $0 AND isDone = false", project).length
  )

  const styles = StyleSheet.create({
    text: {
      fontFamily: "OpenSansBold",
      textAlign: "center",
      backgroundColor,
      height: 20,
      width: 20,
      borderRadius: 25,
    },
  })
  useFocusEffect(
    React.useCallback(() => {
      setCountResult(
        database
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
