import { Model } from "@nozbe/watermelondb"
import {
  field,
  text,
  date,
  readonly,
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

  @relation("projects", "project_id")
  project

  @relation("comments", "task_id")
  comments

  @writer async changeTitle(newTaskTitle) {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.title = newTaskTitle
    })
  }

  @writer async handleIsDone() {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.isDone = !updatedTask.isDone
    })
  }

  @writer async handleIsPriority() {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.isPriority = !updatedTask.isPriority
    })
  }

  @writer async changeDeadline(newDate) {
    await this.update((task) => {
      const updatedTask = task
      updatedTask.deadlineAt = newDate
    })
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

  async markAsDeleted() {
    await this.comments.destrolAllPermantenlty()
    await super.markAsDeleted()
  }
}
