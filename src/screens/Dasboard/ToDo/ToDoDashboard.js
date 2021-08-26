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
import {Icon} from "react-native-elements";
import Modal from "react-native-modal";
import TaskItem from "../../../components/components/TaskItem"
import { strings } from "../../../translations/translations";
import sharedStyles from "../../../styles/shared";
import ProjectItem from "../../../components/components/ProjectItem";
import FlexLayout from "../../../components/Layouts/FlexLayout";
import PropertyItem from "../../../components/components/PropertyItem";
import ModalCreateProject from "../../../components/ModalComponents/ModalCreateProject";
import ErrorText from "../../../components/Text/ErrorText";

const ToDoDashboad = () => {
    const [displayOnlyPriorityTasks, setDisplayOnlyPriorityTasks] = useState(false)
    const [tasks, setTasks] = useState(getAllTasks());
    const [projects,setProjects] = useState(getAllProjects())
    const [taskInput,setTaskInput] = useState()
    const [visibleCreateProject,setVisibleCreateProject] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)

    function handlerSetTasks() {
        displayOnlyPriorityTasks === true
            ? setTasks(realm.objects("Task").filtered("priority == true").sorted("createdDate", "Descending"))
            : setTasks(realm.objects("Task").sorted("createdDate", "Descending"))
        setErrorStatus(false)
    }

    function onRealmChange() {
        handlerSetTasks()
        setProjects(getAllProjects())
        setVisibleCreateProject(false)
      }
      
    realm.addListener("change", onRealmChange);
    
    useEffect(() => {
        handlerSetTasks()
    }, [displayOnlyPriorityTasks])

    const submitTaskHandler = (value) => {
        if (value.nativeEvent.text !== "" & value.nativeEvent.text.trim().length > 0) {
            createTask(value.nativeEvent.text,displayOnlyPriorityTasks)
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

        headerAllTask: {
            opacity: displayOnlyPriorityTasks === false ? 1 : 0.3
        },

        headerPriorityTasks: {
            opacity: displayOnlyPriorityTasks === false ? 0.3 : 1
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
            <View style={styles.container} >
                <View style={styles.tasksContainer}>
                    <View 
                        style={[                                
                            sharedStyles.wrapperInLine,
                            styles.headerWrapper,
                            {backgroundColor:"rgb(250,250,250)"}
                        ]}
                    >
                        <Text 
                            onPress={() => setDisplayOnlyPriorityTasks(false)} 
                            style= {[styles.header,styles.headerAllTask]}
                        >
                            {strings("allTasks")} 
                        </Text>

                        <Text 
                            onPress={() => setDisplayOnlyPriorityTasks(true)} 
                            style= {[styles.header,styles.headerPriorityTasks]}
                        >
                            {strings("priorityTasks")}
                        </Text>
                    </View>
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
                                : null  }     
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
                </View>
        
            </View>
            </>

    );
};

export default ToDoDashboad;