/* eslint-disable no-param-reassign */

// import { Q } from "@nozbe/watermelondb"
import { database } from "../database"

const projects = database.collections.get("projects")

export default {
  observeAllProjects: () => projects.query(),

  createProject: async (_name) => {
    await database.write(async () => {
      await projects.create((project) => {
        project.name = _name
      })
    })
  },
}
