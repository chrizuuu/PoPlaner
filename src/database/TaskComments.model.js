import { Model } from "@nozbe/watermelondb"
import {
  text,
  date,
  immutableRelation,
  readonly,
} from "@nozbe/watermelondb/decorators"

export default class TaskComments extends Model {
  static table = "task_comments"

  static associations = {
    projects: { type: "belongs_to", key: "task_id" },
  }

  @text("content")
  content

  @readonly
  @date("created_at")
  createdAt

  @immutableRelation("tasks", "task_id")
  task
}
