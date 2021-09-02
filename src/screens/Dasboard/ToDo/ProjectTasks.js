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
    Text
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
import { TouchableOpacity } from "react-native-gesture-handler";
import sharedStyles from "../../../styles/shared";
const windowHeight = Dimensions.get("window").height;

const ProjectTasks = ({navigation,route}) => {
    const {projectId,priority,displayProjectProperty} = route.params
    const project = realm.objectForPrimaryKey("Project",projectId)

    const [tasks, setTasks] = useState(getProjectTasks(project));
    const [taskInput,setTaskInput] = useState("")
    const [addFormVisible,setAddFormVisible] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [projectInfoVisible,setProjectInfoVisible] = useState(false)
    const inputTaskTitle = useRef(null)

    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity 
                style={{marginRight:11}} 
                onPress={() => setProjectInfoVisible(true)}
            >
                <Icon 
                    type="ionicon"
                    name="information-circle-outline"
                    
                />      
            </TouchableOpacity>    
            ),
        });
    }, [navigation]);

    function onRealmChange() {
        setTasks(getProjectTasks(project))
      }
    
    useFocusEffect(
        React.useCallback(() => {
            getProjectTasks(project)
            realm.addListener("change", onRealmChange);
            return () => 
                realm.removeListener("change",onRealmChange);
        }, [navigation])
    );
    
    const handleAddFormVisibile = () => {
        setAddFormVisible(true)
        setTimeout(() => inputTaskTitle.current.focus(), 0)
    }

    const addFormDismiss = () => {
        setAddFormVisible(false)
        Keyboard.dismiss()
    } 

    const submitTaskHandler = (value) => {
        if (value.nativeEvent.text !== "" & value.nativeEvent.text.trim().length > 0) {
            createTask(value.nativeEvent.text,priority,project)
            setErrorStatus(false)
            setTasks(tasks)
            setTaskInput("")
            addFormDismiss()
        }
        else {
            setErrorStatus(true)
            setTimeout(() => inputTaskTitle.current.focus(), 0)
        }
    }

    const taskCreateInputHandler = (value) => {
        if (value !== "" & value.trim().length > 0) {
            setErrorStatus(false)
            setTaskInput(value)
        }
        else {
            setErrorStatus(true)
            setTaskInput(value)
        }
    }

    const backdropHandler = () => {
        if (taskInput !== "" & taskInput.trim().length > 0) {
            Keyboard.dismiss()
        }
        else {
            setErrorStatus(false)
            setAddFormVisible(false)
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex:1,
            width:"100%",
            height: windowHeight,
            backgroundColor:"rgb(244, 244, 244)",
        },

        textInputContainer: {
            transform: addFormVisible? [{translateY:0}] :[ {translateY:-60}],
            display:addFormVisible? "flex": "none",
            flexDirection:"row",
            alignItems:"center",
            borderColor: "rgb(48,48,48)",
            borderWidth:1, 
            borderRadius:5,
            backgroundColor:"rgb(255,255,255)",
            width:"90%",
            height:40,
            paddingHorizontal:5,
            color:"black",
            marginHorizontal:15,
            marginVertical:10,
        },
        listFooter: {
            height:40,
            width:"100%",
            backgroundColor:"rgb(255,255,255)",
            borderTopWidth:1,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
        },
        backdropPressable: {
            position:"absolute",
            width:"100%",
            height:"100%",
            top:60,
        },
        footer: {
            alignItems:"center",
            flexDirection:"row",
            width:"100%",
            justifyContent:"flex-end",
            backgroundColor:"rgb(255,255,255)",
        }
    })
 
    return (
        <>
            <View style={styles.container}>
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
                            <TaskItem 
                                item_id={item._id} 
                                displayProjectProperty={displayProjectProperty} 
                            />
                    )}} 
                /> 
                <View style={[styles.footer,sharedStyles.padding10]}>
                    <Icon 
                        type="ionicon"
                        name="add-outline" 
                        style={{}}
                        size={28}
                        onPress={() => handleAddFormVisibile()}
                    />                   
                </View> 

            </View>
            {addFormVisible
            ?    
                <Pressable 
                    onPress={() => backdropHandler()} 
                    style={styles.backdropPressable} 
                />
            : null
            }
        </>

    );
};

export default React.memo(ProjectTasks)