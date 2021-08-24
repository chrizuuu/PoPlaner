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
            id: "objectId",
            title: "string",
        },
        primaryKey: "id",

    }
}

class ProjectSchema extends Realm.Object {
    static schema = {
        name: "Project",
        properties: {
            id: "objectId",
            title:"string",
            isDone: {type: "bool", default: false},
            createdDate:"date",
            deadlineDate:"date?",
            description: {type:"string", default: ""}
        },
        primaryKey: "id",

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

const createTask = (_title,_priority) => {
    realm.write(() => {
        const task = realm.create("Task", {
            id: new ObjectId(),
            title: _title,
            createdDate: new Date(),
            priority:_priority,
            comment:"",
        });
    });
}

const getAllTasks =() => {
    return realm.objects("Task").filtered("isDone == false").sorted("createdDate","Descendig")
}

const changePriority = (_task) => {
    realm.write(() => {
        _task.priority = !_task.priority;
    })  
}

const updateIsDone = (_task) => {
    realm.write(() => {
        _task.isDone = !_task.isDone;
    })
}

const deleteTask = (_task) => {
    realm.write(() => {
     realm.delete(_task);
    });
};


// Category handlers

// Project handlers

const createProject = (_title,_comment) => {
    realm.write(() => {
        const project = realm.create("Project", {
            id: new ObjectId(),
            title: _title,
            createdDate: new Date(),
            description:_comment,
        });
    });
}

const getAllProjects = () => {
    return realm.objects("Project").filtered("isDone == false").sorted("createdDate","Descendig")
}

//Pomodoro handlers 

export default realm;
// Export other functions so other files can access it

export {
    createTask,
    getAllTasks,
    changePriority,
    updateIsDone,
    deleteTask,
    createProject,
    getAllProjects
}