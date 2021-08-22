import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StatusBar, FlatList, View, TouchableOpacity,TextInput,Keyboard,Switch,StyleSheet,} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout'
import realm, { createTask, getAllTasks } from "../../../Database/Database"
import TaskItem from '../../../components/components/TaskItem'
import { strings } from '../../../translations/translations';
import sharedStyles from '../../../styles/shared';


const ToDoDashboad = () => {
    const [displayOnlyPriorityTasks, setDisplayOnlyPriorityTasks] = useState(false)
    const [tasks, setTasks] = useState(getAllTasks());
    const [input,setInput] = useState()

    function handlerSetTasks() {
        displayOnlyPriorityTasks === true
            ? setTasks(realm.objects("Task").filtered("priority == true").sorted("createdDate", "Descending"))
            : setTasks(realm.objects("Task").sorted("createdDate", "Descending"))
    }

    function onRealmChange() {
        console.log("Something changed!");
        handlerSetTasks()
      }
      
    realm.addListener("change", onRealmChange);
    
    useEffect(() => {
        handlerSetTasks()
    }, [displayOnlyPriorityTasks])


    const submitHandler = (value) => {
        if (value.nativeEvent.text !== "" & value.nativeEvent.text.trim().length > 0) {
            createTask(value.nativeEvent.text,displayOnlyPriorityTasks)
            setTasks(tasks)
            Keyboard.dismiss
            setInput('')
        }
        console.log(!value.nativeEvent.text.trim().length < 1)
    }

    const changeHandler = (value) => {
        setInput(value)
    }

    const styles = StyleSheet.create({
        headerWrapper: {
            justifyContent:'space-between',
            padding:20,
            backgroundColor:'rgb(250,250,250)'
        },
        header: {
            fontFamily:"OpenSansBold",
            fontSize:18,
            color:"#282828",
        },

        headerAllTask: {
            opacity: displayOnlyPriorityTasks === false ? 1 : 0.3
        },

        headerPriorityTasks: {
            opacity: displayOnlyPriorityTasks === false ? 0.3 : 1
        },
    })
 
    return (
        <>
            <View 
                style={{
                    flex:1,
                    paddingBottom:25,
                    backgroundColor:'rgb(244, 244, 244)'
                }}
            >
                    <View style={{flex:1}}>
                        <View 
                            style={[                                
                                sharedStyles.wrapperInLine,
                                styles.headerWrapper,
                            ]}
                        >
                            <Text onPress={() => setDisplayOnlyPriorityTasks(false)} style= {[styles.header,styles.headerAllTask]}>
                                {strings('allTasks')} 
                            </Text>

                            <Text onPress={() => setDisplayOnlyPriorityTasks(true)} style= {[styles.header,styles.headerPriorityTasks]}>
                                {strings('priorityTasks')}
                            </Text>

                        </View>

                        <FlatList
                            stickyHeaderIndices={[0]}
                            ListHeaderComponent={
                            <TextInput 
                                style={{
                                    borderColor: 'rgb(200,200,200)', 
                                    backgroundColor:'rgb(245,245,245)',
                                    height:40,
                                    color:'black',
                                    paddingVertical:8,
                                    paddingHorizontal:25
                                }}
                                placeholder="Add task..."
                                onChangeText = {(input) => changeHandler(input)}
                                value={input}
                                onSubmitEditing={(event) => {
                                    submitHandler(event)
                                }}
                            />             
                            }
                            data={tasks}
                            showsVerticalScrollIndicator ={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                            return (
                                <TaskItem item_id={item.id} />
                            )}} 
                        />
                        <Text onPress={() => allTasksDisplay()} style= {styles.header}>
                                Projects
                        </Text>

                    </View> 
            </View>
            </>

    );
};

export default ToDoDashboad;