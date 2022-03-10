import React from "react"
import { ScrollView, Pressable } from "react-native"
import withObservables from "@nozbe/with-observables"
import ProjectDAO from "../../database/DAO/ProjectDAO"
import { TextBold, TextReg } from "../Text/Text"
import { strings } from "../../translations/translations"

const ProPicker = ({ projects, pickProject }) => {
  return (
    <ScrollView
      style={{ paddingHorizontal: 15 }}
      showsVerticalScrollIndicator={false}
    >
      <TextBold fontSize={18} style={{ marginBottom: 20, paddingTop: 10 }}>
        {strings("taskProjectPickerList")}
      </TextBold>
      <Pressable onPress={() => pickProject(null)}>
        <TextReg fontSize={15} style={{ height: 40 }}>
          Inbox
        </TextReg>
      </Pressable>
      {projects.map((project) => (
        <Pressable
          project={project}
          key={project.id}
          onPress={() => pickProject(project)}
          style={{ height: 40 }}
        >
          <TextReg fontSize={15}>{project.name}</TextReg>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const allProjects = withObservables([], () => ({
  projects: ProjectDAO.observeAllProjects(),
}))

const ProjectPicker = allProjects(ProPicker)

export default ProjectPicker
