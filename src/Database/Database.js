/* eslint-disable max-classes-per-file */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-destructuring */

import Realm from "realm"
import { ObjectId } from "bson"
import { object } from "prop-types"

let { initProject } = object

class TaskSchema extends Realm.Object {
  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      title: "string",
      isDone: { type: "bool", default: false },
      priority: { type: "bool", default: false },
      comment: "string?",
      createdDate: "date",
      deadlineDate: "date?",
      project: "Project?",
    },
  }
}

class ProjectSchema extends Realm.Object {
  static schema = {
    name: "Project",
    primaryKey: "_id",
    properties: {
      _id: "int",
      title: "string",
      createdDate: "date",
      description: { type: "string", default: "" },
      tasks: "Task[]",
      visible: { type: "bool", default: true },
    },
  }
}

const database = new Realm({
  schema: [TaskSchema, ProjectSchema],
  schemaVersion: 1,
})

// Task handlers

const createTask = (_title, _priority, _project, _date) => {
  const taskProject = _project != null ? _project : initProject
  database.write(() => {
    const task = database.create("Task", {
      _id: new ObjectId(),
      title: _title,
      createdDate: new Date(),
      deadlineDate: _date,
      priority: _priority,
      project: taskProject,
      comment: "",
    })
    taskProject.tasks.push(task)
  })
}

const getAllTasks = () => database
    .objects("Task")
    .filtered("isDone == false AND project == $0", initProject)
    .sorted("createdDate", true)

const getPriorityTasks = () => database
    .objects("Task")
    .filtered("isDone == false AND priority == true")
    .sorted("createdDate", true)

const getProjectTasks = (project) => {
  const projectObject = project
  return database
    .objects("Task")
    .filtered("isDone == false AND project == $0", projectObject)
    .sorted("deadlineDate")
}

const changePriority = (_task) => {
  const task = _task
  database.write(() => {
    task.priority = !task.priority
  })
}

const updateIsDone = (_task) => {
  const task = _task
  database.write(() => {
    task.isDone = !task.isDone
  })
}

const deleteTask = (_task) => {
  const task = _task
  database.write(() => {
    database.delete(task)
  })
}

// Project handlers

const createProject = (_title, _comment) => {
  const title = _title
  const comment = _comment
  database.write(() => {
    database.create("Project", {
      _id: database.objects("Project").max("_id") + 1,
      title,
      createdDate: new Date(),
      description: comment,
    })
  })
}

const getAllProjects = () => database
    .objects("Project")
    .filtered("visible == true")
    .sorted("createdDate", "Descendig")

/* eslint consistent-return: off */

const deleteProject = (_project) => {
  const project = _project
  database.write(() => {
    for (let i = 0; i < project.tasks.length; i += 1) {
      project.tasks[0].project = initProject
    }
    database.delete(project)
  })
}

// init objects on first run

const initDB = () => {
  if (database.objects("Project").length < 1) {
    database.write(() => (initProject = database.create("Project", {
        _id: 1,
        title: "Wszystkie sprawy",
        createdDate: new Date(),
        visible: false,
      })))
  } else {
    return (initProject = database
      .objects("Project")
      .filtered("visible == false")[0])
  }
}
initDB()

export default database

export {
  createTask,
  getAllTasks,
  getPriorityTasks,
  getProjectTasks,
  changePriority,
  updateIsDone,
  deleteTask,
  createProject,
  deleteProject,
  getAllProjects,
}
