import React from "react"
import { View, StyleSheet } from "react-native"
import withObservables from "@nozbe/with-observables"
import { Q } from "@nozbe/watermelondb"
import { TextSemi, TextReg } from "../../Text/Text"
import { database } from "../../../database/database"

const ProjectItem = ({ project, tasksCount, focused }) => {
  const styles = StyleSheet.create({
    wrapper: {
      height: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
    },
    focused: { backgroundColor: "rgba(50,50,50,0.5)", borderRadius: 5 },
    notFocused: { backgroundColor: "white" },
  })

  return (
    <View
      style={[
        styles.wrapper,
        focused === true ? styles.focused : styles.notFocused,
      ]}
    >
      <TextSemi>{project.name}</TextSemi>
      <TextReg>{tasksCount}</TextReg>
    </View>
  )
}

const enhance = withObservables(["project"], ({ project }) => ({
  project: project.observe(),
  tasksCount: database.collections
    .get("tasks")
    .query(Q.where("is_done", false), Q.where("project_id", project.id))
    .observeCount(),
}))

export default enhance(ProjectItem)
