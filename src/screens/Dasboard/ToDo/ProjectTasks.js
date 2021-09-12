import React, {
    useState, 
    useLayoutEffect,
    useRef,
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
    getProjectTasks,
    deleteProject
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
import colors from "../../../styles/colorsLightTheme"
import TaskInput from "../../../components/Inputs/TaskInput";

const ProjectTasks = ({navigation,route}) => {
    const {projectId,displayProjectProperty} = route.params
    const project = realm.objectForPrimaryKey("Project",projectId)
    const [tasks, setTasks] = useState(getProjectTasks(project));
    const [projectPageIsOpen,setProjectPageIsOpen] = useState(false)
    const [projectTitle,setProjectTitleInput] = useState(project.title)
    const [projectTitleErrorStatus,setProjectTitleErrorStatus] = useState(false)
    const [projectDescription,setProjectDescriptionInput] = useState(project.description)
    const [projectDescriptionErrorStatus,setProjectDescriptionErrorStatus] = useState(false)
    const [saveDescBtnVisible,setSaveDescBtnVisible] = useState(false)
    const inputTaskRef = useRef(null)

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
    
    const showTaskInput = () => {
        inputTaskRef.current.addFormSetVisible()
    }

    const styles = StyleSheet.create({
        header: {
            textAlign:"center",
            fontSize:16,
            fontFamily:"OpenSansBold"
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
        modalFooter: {
            alignItems:"center",
            flexDirection:"row",
            width:"100%",
            justifyContent:"space-between",
            backgroundColor:colors.primeColor,
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
                    keyboardShouldPersistTaps={'handled'}
                    ListHeaderComponent={
                        <TaskInput 
                            priority={false}
                            project={project}
                            date={null}
                            ref={inputTaskRef}
                        />
                    }
                    data={tasks}
                    showsVerticalScrollIndicator ={false}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({item}) => {
                        return (
                            <TaskItem
                                //provideModalVisibleStatus={provideModalVisibleStatus} 
                                item_id={item._id} 
                                displayProjectProperty={displayProjectProperty} 
                            />
                    )}} 
                /> 
                <FooterList 
                    leftIcon="add-outline"
                    leftIconOnPress={showTaskInput}
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
                <View style={[styles.modalFooter,sharedStyles.padding10]}>
                    <Icon 
                        name="arrow-forward" 
                        color="#484848"
                        size={28} 
                        onPress={() => setProjectPageIsOpen(!projectPageIsOpen)} 
                    />
                    <Icon 
                        name="delete-outline" 
                        color="#EE5436"
                        size={28} 
                        onPress={() =>{ 
                            navigation.goBack()
                            deleteProject(project)
                        }}
                     />
                </View>
            </Modal>
        </>

    );
};

export default React.memo(ProjectTasks)