import { ObjectId } from "bson";
import realm from "./Database";

// Task handlers

const createTask = (_title,_priority,_project) => {
    realm.write(() => {
        const task = realm.create("Task", {
            _id: new ObjectId(),
            title: _title,
            createdDate: new Date(),
            priority:_priority,
            project: _project,
            comment:"",
        });
    });
}

const getTasks = (priorityValue) => {
    return realm.objects("Task").filtered("isDone == false AND priority == $0",priorityValue).sorted("createdDate","Descendig")
}

const getProjectTasks = (project) => {
    return realm.objects("Task").filtered("isDone == false AND project == $0",project).sorted("createdDate","Descendig")

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
            _id: new ObjectId(),
            title: _title,
            createdDate: new Date(),
            description:_comment,
        });
    });
}

const getAllProjects = () => {
    return realm.objects("Project").filtered("isDone == false").sorted("createdDate","Descendig")
}

export {
    createTask,
    getTasks,
    getProjectTasks,
    changePriority,
    updateIsDone,
    deleteTask,
    createProject,
    getAllProjects,
}