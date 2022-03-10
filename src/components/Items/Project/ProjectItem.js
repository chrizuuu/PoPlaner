import React from "react"
import { View } from "react-native"
import withObservables from "@nozbe/with-observables"
import { Q } from "@nozbe/watermelondb"
import { TextSemi, TextReg } from "../../Text/Text"
import { database } from "../../../database/database"

const ProjectItem = ({ project, tasksCount }) => {
  return (
    <View
      style={{
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
      }}
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
