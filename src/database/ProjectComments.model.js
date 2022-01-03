import { Model } from "@nozbe/watermelondb"
import {
  text,
  date,
  immutableRelation,
  readonly,
} from "@nozbe/watermelondb/decorators"

export default class ProjectComments extends Model {
  static table = "project_comments"

  static associations = {
    projects: { type: "belongs_to", key: "project_id" },
  }

  @text("content")
  content

  @readonly
  @date("created_at")
  createdAt

  @immutableRelation("projects", "project_id")
  project
}
