import Realm from "realm";
const { UUID } = Realm.BSON;


class TaskSchema extends Realm.Object {
    static schema = {
        name: "Task",
        properties: {
            id: 'uuid',
            title: "string",
            isDone: {type: "bool", default: false},
            priority: {type: "bool", default:false},
            comment: "string?",
            project:"Project?",
            category:"Category?",
            createdDate: "date",
            deadlineDate:"date?",
            //timeNeeded: "int?",
        }
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
            id:"uuid",
            tasks:"Task[]",
            startTime:"date",
            endTime:"date?",
            duration:"int?",
            
        }
    }
}

let realm = new Realm({schema: [TaskSchema,CategorySchema,ProjectSchema,PomodoroTimerSchema], schemaVersion: 2});


const createTask = (_title) => {
    realm.write(() => {
        const task = realm.create("Task", {
            id: new UUID(),
            title: _title,
            createdDate: new Date(),
        });
    });
}

const getAllTasks =() => {
    return realm.objects("Task")
}


export default realm;
// Export other functions so other files can access it

export {
    createTask,
    getAllTasks
}