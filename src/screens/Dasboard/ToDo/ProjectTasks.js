import React, {
    useState, 
    useLayoutEffect,
    useRef,
    useEffect
} from "react";
import {
    FlatList,
    View, 
    TextInput,
    Keyboard,
    StyleSheet,
    Dimensions,
    Pressable,
    Text,
    TouchableOpacity
} from "react-native";
import realm, { 
    createTask, 
    getTasks,
    getProjectTasks
} from "../../../Database/Database"
import { useFocusEffect } from '@react-navigation/native';
import {Icon} from "react-native-elements";
import TaskItem from "../../../components/components/TaskItem"
import { strings } from "../../../translations/translations";
import ErrorText from "../../../components/Text/ErrorText";
import sharedStyles from "../../../styles/shared";
import Modal from "react-native-modal";
import FlexLayout from "../../../components/Layouts/FlexLayout";
import FooterList from "../../../components/components/FooterList";
import ToDoSTyles from "./style";
import { Button } from "react-native-elements/dist/buttons/Button";
import colors from "../../../styles/colorsLightTheme"

const windowHeight = Dimensions.get("window").height;

const ProjectTasks = ({navigation,route}) => {
    const {projectId,priority,displayProjectProperty} = route.params
    const project = realm.objectForPrimaryKey("Project",projectId)

    const [tasks, setTasks] = useState(getProjectTasks(project));
    const [projectPageIsOpen,setProjectPageIsOpen] = useState(false)
    const [projectTitle,setProjectTitleInput] = useState(project.title)
    const [projectTitleErrorStatus,setProjectTitleErrorStatus] = useState(false)
    const [projectDescription,setProjectDescriptionInput] = useState(project.description)
    const [projectDescriptionErrorStatus,setProjectDescriptionErrorStatus] = useState(false)
    const [saveDescBtnVisible,setSaveDescBtnVisible] = useState(false)
    const [taskInput,setTaskInput] = useState("")
    const [addFormVisible,setAddFormVisible] = useState(false)
    const [taskInputErrorStatus, setTaskInputErrorStatus] = useState(false)
    const inputTaskTitle = useRef(null)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                    <Text style={styles.header}> 
                        {project.title}  
                    </Text>
            ),
            headerRight: () => (
                <Pressable 
                    onPress={() => setProjectPageIsOpen(!projectPageIsOpen)}
                    style={{marginRight:11}
                }>
                    <Icon
                        type="ionicon"
                        name="information-circle-outline"
                        size={28}
                    />
                </Pressable>
            )
    });}, [navigation]);

    function onRealmChange() {
        setTasks(getProjectTasks(project))
      }
    
    useFocusEffect(
        React.useCallback(() => {project
            getProjectTasks(project)
            realm.addListener("change", onRealmChange);
            return () => 
                realm.removeListener("change",onRealmChange);
        }, [navigation])
    );

    const changeProjectTitleHandler = () => {
        if (projectTitle !== "" && projectTitle.trim().length > 0) {
            setProjectTitleErrorStatus(false)
            realm.write(() => {
                project.title = projectTitle
            })
        }
        else {
            setProjectTitleErrorStatus(true)           
        }
    }

    const changeProjectDescriptionHandler = () => {
        if (projectDescription !== "" && projectDescription.trim().length > 0) {
            setProjectDescriptionErrorStatus(false)
            realm.write(() => {
                project.description = projectDescription
            })
            Keyboard.dismiss()
            setSaveDescBtnVisible(false)
        }
        else {
            setProjectDescriptionErrorStatus(true)           
        }
    }
    
    const handleAddFormVisibile = () => {
        setAddFormVisible(true)
        setTimeout(() => inputTaskTitle.current.focus(), 0)
    }

    const addFormDismiss = () => {
        setAddFormVisible(false)
        Keyboard.dismiss()
    } 

    const submitTaskHandler = (value) => {
        if (value.nativeEvent.text !== "" && value.nativeEvent.text.trim().length > 0) {
            createTask(value.nativeEvent.text,priority,project)
            setTaskInputErrorStatus(false)
            setTasks(tasks)
            setTaskInput("")
            addFormDismiss()
        }
        else {
            setTaskInputErrorStatus(true)
            setTimeout(() => inputTaskTitle.current.focus(), 0)
        }
    }

    const taskCreateInputHandler = (value) => {
        if (value !== "" && value.trim().length > 0) {
            setTaskInputErrorStatus(false)
            setTaskInput(value)
        }
        else {
            setTaskInputErrorStatus(true)
            setTaskInput(value)
        }
    }

    const backdropHandler = () => {
        if (taskInput !== "" && taskInput.trim().length > 0) {
            Keyboard.dismiss()
        }
        else {
            setTaskInputErrorStatus(false)
            setAddFormVisible(false)
        }
    }

    const styles = StyleSheet.create({
        header: {
            textAlign:"center",
            fontSize:16,
            fontFamily:"OpenSansBold"
        },

        textInputContainer: {
            transform: addFormVisible? [{translateY:0}] :[ {translateY:-60}],
            display:addFormVisible? "flex": "none",
            flexDirection:"row",
            alignItems:"center",
            borderColor: colors.thirdColor,
            borderWidth:1, 
            borderRadius:5,
            backgroundColor:colors.primeColor,
            width:"90%",
            height:40,
            paddingHorizontal:5,
            color:colors.textColor,
            marginHorizontal:15,
            marginVertical:10,
        },
        modalContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignContent: "flex-end",
        },
        modalWrapper: {
            width: "100%",
            backgroundColor:colors.primeColor,
        },
        modalHeader:{
            backgroundColor:colors.primeColor,
            padding:15,
            fontFamily:"OpenSansBold",
        },
        modalHeaderText:{
            fontFamily:"OpenSansBold",
        },
        modalInput: {
            marginHorizontal:25,
            marginVertical:10,
            borderWidth:1,
            borderColor:colors.thirdColor,
            backgroundColor:colors.primeColor,
            borderRadius:5,
            padding:10,
            textAlign:'left',
        },
        saveCommentBtn:{
            textAlign:"center",
            padding:5,
            backgroundColor:colors.thirdColor,
            borderRadius:5,
        },
    })
 
    return (
        <>
            <View style={ToDoSTyles.tasksListContainer}>
                <FlatList
                    style={{flex:1}}
                    keyboardShouldPersistTaps="always"
                    ListHeaderComponent={
                        <>
                            <View style={styles.textInputContainer}>
                                <Icon 
                                    size={32} 
                                    type="ionicon" 
                                    name="close-outline" 
                                    style={{marginRight:10,}} 
                                    onPress={() =>addFormDismiss() }
                                />
                                <TextInput 
                                    style={{flex:1}}
                                    placeholder={strings("taskAddForm")}
                                    onChangeText = {(taskInput) => taskCreateInputHandler(taskInput)}
                                    value={taskInput}
                                    onSubmitEditing={(event) => {
                                        submitTaskHandler(event)
                                    }}
                                    ref={inputTaskTitle}
                                />
                            </View>
                            {taskInputErrorStatus === true 
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
                            <TaskItem 
                                item_id={item._id} 
                                displayProjectProperty={displayProjectProperty} 
                            />
                    )}} 
                /> 
                <FooterList 
                    leftIcon="add-outline"
                    leftIconOnPress={() => handleAddFormVisibile()}
                />
                
            </View>
            <Modal 
                animationIn="slideInRight"
                animationOut="slideOutRight"
                swipeDirection="right"
                isVisible={projectPageIsOpen} 
                onSwipeComplete={() => setProjectPageIsOpen(!projectPageIsOpen)}
                onBackdropPress={() => setProjectPageIsOpen(!projectPageIsOpen)}
                style={sharedStyles.modalContainer}
            >
                <FlexLayout style={{backgroundColor:colors.secondColor}}>
                     <Text style={styles.modalHeader}> 
                            {strings("projectPropertyTitle")}
                    </Text>
                    <TextInput 
                        style={[styles.modalInput]}
                        name="input"
                        maxLength={100}
                        defaultValue={projectTitle}
                        onChangeText={(input) => setProjectTitleInput(input)}
                        onSubmitEditing={() => changeProjectTitleHandler() }
                    />
                    {   projectTitleErrorStatus === true
                        ? <ErrorText errorValue={strings("inputEmptyError")} />
                        : null
                    }
                    <View style={[sharedStyles.wrapperInLine,styles.modalHeader,{justifyContent:"space-between"}]}>
                        <Text style={styles.modalHeaderText}>
                            {strings("projectPropertyDescription")}
                        </Text>
                        {saveDescBtnVisible === true
                        ?   <TouchableOpacity
                                style={styles.saveCommentBtn}
                                onPress={() => {
                                changeProjectDescriptionHandler()
                                }}
                            >
                                <Text>
                                {strings("saveComment")} 
                                </Text>
                            </TouchableOpacity>
                        : <View />}
                    </View>
                    <TextInput 
                        style={[styles.modalInput,{minHeight:200,maxHeight:250,textAlignVertical:'top'}]}
                        name="inputDescription"
                        maxLength={500}
                        multiline={true}
                        defaultValue={project.description}
                        placeholder={strings("createProjectDescription")}
                        onChangeText={(input) => {
                            setProjectDescriptionInput(input)
                            setSaveDescBtnVisible(true)
                        }}
                        onSubmitEditing={() => changeProjectDescriptionHandler() }
                    />
                    {   projectDescriptionErrorStatus === true
                        ? <ErrorText errorValue={strings("inputEmptyError")} />
                        : null
                    }

                    <Text style={[sharedStyles.padding10]}>
                        {strings("taskCreatedAt")}{project.createdDate.toLocaleDateString() + " " + project.createdDate.toLocaleTimeString()}
                    </Text>
                </FlexLayout>
            </Modal>
            {addFormVisible
            ?    
                <Pressable 
                    onPress={() => backdropHandler()} 
                    style={ToDoSTyles.backdropPressable} 
                />
            : null
            }
        </>

    );
};

export default React.memo(ProjectTasks)