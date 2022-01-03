import { appSchema, tableSchema } from "@nozbe/watermelondb/Schema"

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "tasks",
      columns: [
        { name: "title", type: "string" },
        { name: "is_done", type: "boolean" },
        { name: "is_priority", type: "boolean" },
        { name: "created_at", type: "number" },
        { name: "deadline_at", type: "number", isOptional: true },
        {
          name: "project_id",
          type: "string",
          isIndexed: true,
          isOptional: true,
        },
        // {name: "project_id", type: "string"},
      ],
    }),
    tableSchema({
      name: "projects",
      columns: [
        { name: "name", type: "string" },
        { name: "created_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "task_comments",
      columns: [
        { name: "content", type: "string" },
        { name: "created_at", type: "number" },
        { name: "task_id", type: "string", isIndexed: true },
      ],
    }),
    tableSchema({
      name: "project_comments",
      columns: [
        { name: "content", type: "string" },
        { name: "created_at", type: "number" },
        { name: "project_id", type: "string", isIndexed: true },
      ],
    }),
  ],
})
