import Realm from "realm";
import { ObjectId } from "bson";

class TaskSchema extends Realm.Object {
    static schema = {
        name: "Task",
        properties: {
            id: "objectId",
            title: "string",
            isDone: {type: "bool", default: false},
            priority: {type: "bool", default:false},
            comment: "string?",
            project:"Project?",
            category:"Category?",
            createdDate: "date",
            deadlineDate:"date?",
            //timeNeeded: "int?",
        },
        primaryKey: "id",
    }
}

class CategorySchema extends Realm.Object {
    static schema = {
        name: "Category",
        properties: {
            title: "string",
        }
    }
}

class ProjectSchema extends Realm.Object {
    static schema = {
        name: "Project",
        properties: {
            title:"string",
            isDone:"bool",
            createdDate:"date",
            description: "string?"
        }
    }
}

class PomodoroTimerSchema extends Realm.Object {
    static schema = {
        name:'PomodoroTimer',
        properties: {
            id:"objectId",
            tasks:"Task[]",
            startTime:"date",
            endTime:"date?",
            duration:"int?",
            
        },
        primaryKey: "id",
    }
}
let realm = new Realm({schema: [TaskSchema,CategorySchema,ProjectSchema,PomodoroTimerSchema], schemaVersion: 3});

// Task handlers

const createTask = (_title) => {
    realm.write(() => {
        const task = realm.create("Task", {
            id: new ObjectId(),
            title: _title,
            createdDate: new Date(),
        });
    });
}

const getAllTasks =() => {
    return realm.objects("Task").filtered("isDone == false").sorted("createdDate","Descendig")
}

// Category handlers


// Project handlers

//Pomodoro handlers 

export default realm;
// Export other functions so other files can access it

export {
    createTask,
    getAllTasks,
}