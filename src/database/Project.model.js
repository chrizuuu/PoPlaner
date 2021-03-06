import { Model } from "@nozbe/watermelondb"
import {
  field,
  date,
  children,
  writer,
  readonly,
} from "@nozbe/watermelondb/decorators"

export default class Project extends Model {
  static table = "projects"

  static associations = {
    tasks: { type: "has_many", foreignKey: "project_id" },
    comments: { type: "has_many", foreignKey: "project_id" },
  }

  @field("name")
  name

  @readonly
  @date("created_at")
  createdAt

  @children("tasks")
  tasks

  @children("comments")
  comments

  @writer async changeName(newProjectName) {
    await this.update((project) => {
      const updatedProject = project
      updatedProject.name = newProjectName
    })
  }

  @writer async addTask(_title, _isPriority, _deadlineAt, _deadlineTimeAt) {
    const newTask = await this.collections.get(
      "tasks".create((task) => {
        task.title.set(_title)
        task.isPriority.set(_isPriority)
        task.deadlineAt.set(_deadlineAt)
        task.deadlineTimeAt.set(_deadlineTimeAt)
        task.project.set(this)
      })
    )
    return newTask
  }

  @writer async addComment(body) {
    const newComment = await this.collections.get(
      "comments".create((comment) => {
        comment.content.set(body)
        comment.project.set(this)
        comment.date.set(new Date())
      })
    )
    return newComment
  }

  async delete() {
    await this.tasks.destroyAllPermanently()
    await super.markAsDeleted()
  }
}
