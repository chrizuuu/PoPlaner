import React from "react"
import ProjectsList from "../../components/List/ProjectsList"
import { database } from "../../database/database"

const ProjectsScreen = () => {
  return <ProjectsList database={database} />
}

export default ProjectsScreen
