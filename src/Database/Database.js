import Realm from "realm";
import { ObjectId } from "bson";
import {createProject} from "./DatabaseFunctions"


class TaskSchema extends Realm.Object {
    static schema = {
        name: "Task",
        primaryKey: "_id",
        properties: {
            _id: "objectId",
            title: "string",
            isDone: {type: "bool", default: false},
            priority: {type: "bool", default:false},
            comment: "string?",
            createdDate: "date",
            deadlineDate:"date?",
            project: "Project?"
        },


    }
}

class ProjectSchema extends Realm.Object {
    static schema = {
        name: "Project",
        primaryKey: "_id",
        properties: {
            _id: "objectId",
            title:"string",
            isDone: {type: "bool", default: false},
            createdDate:"date",
            deadlineDate:"date?",
            description: {type:"string", default: ""},
            tasks: "Task[]"
        },

    }
}


class PomodoroTimerSchema extends Realm.Object {
    static schema = {
        name:'PomodoroTimer',
        primaryKey: "_id",
        properties: {
            _id:"objectId",
            tasks:"Task[]",
            startTime:"date",
            endTime:"date?",
            duration:"int?",
            
        },
    }
}
const realm = new Realm({schema: [TaskSchema,ProjectSchema,PomodoroTimerSchema], schemaVersion: 1});

const initDB = () => {
    if (realm.objects("Project").length < 1){
        createProject('Wszystkie sprawy');
    }
}
initDB()

export default realm;
// Export other functions so other files can access it


