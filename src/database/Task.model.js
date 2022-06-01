import { Model } from "@nozbe/watermelondb"
import {
  field,
  text,
  date,
  readonly,
  children,
  relation,
  writer,
} from "@nozbe/watermelondb/decorators"

export default class Task extends Model {
  static table = "tasks"

  static associations = {
    projects: { type: "belongs_to", key: "project_id" },
    comments: { type: "has_many", foreignKey: "task_id" },
  }

  @text("title")
  title

  @field("is_done")
  isDone

  @field("is_priority")
  isPriority

  @readonly
  @date("created_at")
  createdAt

  @date("deadline_at")
  deadlineAt

  @date("deadline_time_at")
  deadlineTimeAt

  @text("description")
  description

  @relation("projects", "project_id")
  project

  @children("comments")
  comments

  @writer async changeTitle(newTaskTitle) {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.title = newTaskTitle
    })
  }

  @writer async changeDesc(newTaskDesc) {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.title = newTaskDesc
    })
  }

  @writer async handleIsDone() {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.isDone = !updatedTask.isDone
      if (updatedTask.isDone === true) {
        super.destroyPermanently()
      }
    })
  }

  @writer async handleIsPriority() {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.isPriority = !updatedTask.isPriority
    })
  }

  @writer async changeDeadlineDate(newTaskDeadline) {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.deadlineAt = newTaskDeadline
    })
  }

  @writer async changeDeadlineTime(newTaskDeadlineTime) {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.deadlineTimeAt = newTaskDeadlineTime
    })
  }

  @writer async updateTask(
    newTitle,
    isDone,
    isPriority,
    newProject,
    newDesc,
    newDeadline,
    newDeadlineTime
  ) {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.title = newTitle
      updatedTask.isDone = isDone
      updatedTask.isPriority = isPriority
      updatedTask.project.set(newProject)
      updatedTask.desc = newDesc
      updatedTask.deadlineAt = newDeadline
      updatedTask.deadlineTimeAt = newDeadlineTime
    })
    if (isDone === true) {
      await super.destroyPermanently()
    }
  }

  @writer async changeProject(projectID) {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.project = projectID
    })
  }

  @writer async addComment(body) {
    const newComment = await this.collections.get(
      "comments".create((comment) => {
        comment.content.set(body)
        comment.task.set(this)
        comment.date.set(new Date())
      })
    )
    return newComment
  }

  @writer async delete() {
    await super.destroyPermanently()
  }
}
