/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
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

if (__DEV__) {
  // Import connectDatabases function and required DBDrivers
  const {
    connectDatabases,
    WatermelonDB,
  } = require("react-native-flipper-databases")

  connectDatabases([
    new WatermelonDB(database), // Pass in database definition
  ])
}
/// FlipperDatabasesPlugin - END
// eslint-disable-next-line no-undef
