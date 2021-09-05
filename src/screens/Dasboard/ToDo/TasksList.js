import React, {
    useState, 
    useLayoutEffect,
    useEffect,
    useRef
} from "react";
import {
    FlatList,
    View, 
    TextInput,
    Keyboard,
    StyleSheet,
    Pressable
} from "react-native";
import realm, { 
    createTask, 
    getTasks
} from "../../../Database/Database"
import { useFocusEffect } from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import TaskItem from "../../../components/components/TaskItem"
import { strings } from "../../../translations/translations";
import ErrorText from "../../../components/Text/ErrorText";
import ToDoSTyles from "./style";
import FooterList from "../../../components/components/FooterList";
import colors from "../../../styles/colorsLightTheme"


const TasksList = ({navigation,tasksType,priority,displayProjectProperty}) => {
    const [tasks, setTasks] = useState(tasksType);
    const [taskInput,setTaskInput] = useState("")
    const [addFormVisible,setAddFormVisible] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const inputTaskTitle = useRef(null)

    function onRealmChange() {
        setTasks(tasksType)
      }
    
    useFocusEffect(
        React.useCallback(() => {
            setTasks(tasksType)
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
        if (value.nativeEvent.text !== "" && value.nativeEvent.text.trim().length > 0) {
            createTask(value.nativeEvent.text,priority)
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
        if (value !== "" && value.trim().length > 0) {
            setErrorStatus(false)
            setTaskInput(value)
        }
        else {
            setErrorStatus(true)
            setTaskInput(value)
        }
    }

    const backdropHandler = () => {
        if (taskInput !== "" && taskInput.trim().length > 0) {
            Keyboard.dismiss()
        }
        else {
            setErrorStatus(false)
            setAddFormVisible(false)
        }
    }

    const styles = StyleSheet.create({
        textInputContainer: {
            transform: addFormVisible? [{translateY:0}] :[ {translateY:-60}],
            display:addFormVisible? 'flex': 'none',
            flexDirection:'row',
            alignItems:'center',
            borderColor: colors.thirdColor,
            borderWidth:1, 
            borderRadius:5,
            backgroundColor:colors.primeColor,
            width:'90%',
            height:40,
            paddingHorizontal:5,
            color:colors.textColor,
            marginHorizontal:15,
            marginVertical:10,
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
                                    type='ionicon' 
                                    name='close-outline' 
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
                <FooterList 
                    leftIcon="add-outline"
                    leftIconOnPress={() => handleAddFormVisibile()}
                />                  
            </View>
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

export default React.memo(TasksList)