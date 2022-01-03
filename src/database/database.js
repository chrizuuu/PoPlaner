/* eslint-disable global-require */
import { Database } from "@nozbe/watermelondb"
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import schema from "./schema"
import Task from "./Task.model"
import Project from "./Project.model"
import TaskComments from "./TaskComments.model"
import ProjectCommnets from "./ProjectComments.model"

// Database

const adapter = new SQLiteAdapter({
  dbName: "TasksManager",
  schema,
})

// eslint-disable-next-line import/prefer-default-export
export const database = new Database({
  adapter,
  modelClasses: [Task, Project, TaskComments, ProjectCommnets],
})

/// FlipperDatabasesPlugin - START

// eslint-disable-next-line no-undef
