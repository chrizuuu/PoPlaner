import React, {
    useState, 
    useEffect
} from "react";
import {
    Text, 
    FlatList,
    View, 
    TextInput,
    Keyboard,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import realm, { 
    createTask, 
    getAllTasks,
    getAllProjects,
    createProject 
} from "../../../Database/Database"

import TaskItem from "../../../components/components/TaskItem"
import { strings } from "../../../translations/translations";
import ErrorText from "../../../components/Text/ErrorText";

const TasksList = ({tasksType}) => {
    const [tasks, setTasks] = useState(tasksType);
    const [taskInput,setTaskInput] = useState()
    const [errorStatus, setErrorStatus] = useState(false)


    function onRealmChange() {
        setTasks(tasksType)
      }
      
    realm.addListener("change", onRealmChange);
    

    const submitTaskHandler = (value) => {
        if (value.nativeEvent.text !== "" & value.nativeEvent.text.trim().length > 0) {
            createTask(value.nativeEvent.text)
            setErrorStatus(false)
            setTasks(tasks)
            Keyboard.dismiss()
            setTaskInput("")
        }
        else {
            setErrorStatus(true)
        }
    }

    const taskCreateInputHandler = (value) => {
        setTaskInput(value)
    }
    const styles = StyleSheet.create({
        headerWrapper: {
            justifyContent:"space-between",
            padding:20,
        },
        header: {
            fontFamily:"OpenSansBold",
            fontSize:18,
            color:"#282828",
        },

        container: {
            flex:1,
            paddingBottom:25,
            backgroundColor:"rgb(244, 244, 244)"
        },
        
        tasksContainer: {
            flex:2,
        },

        projectsContainer: {
            flex:1,
            borderTopWidth:1,
            borderTopColor:"rgb(200,200,200)"
        },

        textInput: {
            borderColor: "rgb(200,200,200)", 
            backgroundColor:"rgb(245,245,245)",
            height:40,
            color:"black",
            paddingVertical:8,
            paddingHorizontal:25
        },
    })
 
    return (
        <>
            <FlatList
                keyboardShouldPersistTaps={"handled"}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={
                    <>
                        <TextInput 
                            style={styles.textInput}
                            placeholder="Add task..."
                            onChangeText = {(taskInput) => taskCreateInputHandler(taskInput)}
                            value={taskInput}
                            onSubmitEditing={(event) => {
                                submitTaskHandler(event)
                            }}
                        /> 

                        {errorStatus === true 
                            ? (
                                <ErrorText errorValue={strings("inputEmptyError")} />
                            ) 
                            : null  
                        }        
                    </>
                }
                data={tasks}
                showsVerticalScrollIndicator ={false}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({item}) => {
                    return (
                        <TaskItem item_id={item._id} />
                )}} 
            />
        </>

    );
};

export default TasksList