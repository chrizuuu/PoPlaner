/* eslint-disable no-param-reassign */
import { Q } from "@nozbe/watermelondb"
import startOfToday from "date-fns/startOfToday"
import endOfToday from "date-fns/endOfToday"
import startOfDay from "date-fns/startOfDay"
import endOfDay from "date-fns/endOfDay"
import { database } from "../database"

const tasks = database.collections.get("tasks")

export default {
  observeAllTasks: () => tasks.query().observe(),

  observeInboxTasks: () =>
    tasks.query(
      Q.where("is_done", false),
      Q.where("project_id", null),
      Q.sortBy("deadline_at", Q.asc),
      Q.sortBy("deadline_time_at", Q.asc),
      Q.sortBy("created_at", Q.desc)
    ),

  observeTodayTasks: () =>
    tasks.query(
      Q.where(
        "deadline_at",
        Q.gte(startOfToday().getTime()),
        Q.lte(endOfToday().getTime())
      )
    ),
  observeSpecificDayTasks: (date) =>
    tasks.query(
      Q.where(
        "deadline_at",
        Q.gte(startOfDay(date)).getTime(),
        Q.lte(endOfDay(date).getTime())
      )
    ),

  observePriorityTasks: () =>
    tasks.query(Q.where("is_priority", true), Q.sortBy("created_at", Q.desc)),

  createTask: async (
    _title,
    _project,
    _priority,
    _deadlineAt,
    _deadlineTimeAt,
    _description
  ) => {
    await database.write(async () => {
      await tasks.create((task) => {
        task.title = _title
        task.project.set(_project)
        task.isDone = false
        task.isPriority = _priority || false
        task.deadlineAt = _deadlineAt || null
        task.deadlineTimeAt = _deadlineTimeAt || null
        task.description = _description
      })
    })
  },
}
