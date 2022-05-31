import React from "react"
import { View, StyleSheet } from "react-native"
import withObservables from "@nozbe/with-observables"
import { Q } from "@nozbe/watermelondb"
import { TextSemi, TextReg } from "../../Text/Text"
import { database } from "../../../database/database"

const ProjectItem = ({ project, tasksCount }) => {
  const styles = StyleSheet.create({
    wrapper: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      alignItems: "center",
    },
  })

  return (
    <View style={[styles.wrapper]}>
      <View
        style={{
          marginRight: 20,
          backgroundColor: "#e7e7e7",
          width: 28,
          height: 28,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
        }}
      >
        <TextReg>{tasksCount}</TextReg>
      </View>
      <TextSemi>{project.name}</TextSemi>
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
