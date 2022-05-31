import React from "react"
import { View, StyleSheet } from "react-native"
import withObservables from "@nozbe/with-observables"
import { Q } from "@nozbe/watermelondb"
import { TextSemi, TextReg } from "../../Text/Text"
import { database } from "../../../database/database"

const ProjectItem = ({ project, tasksCount }) => {
  const styles = StyleSheet.create({
    wrapper: {
      height: 50,
      paddingLeft: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })

  return (
    <View style={[styles.wrapper]}>
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
