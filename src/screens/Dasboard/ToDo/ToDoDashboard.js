import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StatusBar, FlatList, View, TouchableOpacity,TextInput,Keyboard,Switch,StyleSheet,} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout'
import realm, { createTask, getAllTasks } from "../../../Database/Database"
import ToDoItem from './TodoTask';
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
        createTask(value.nativeEvent.text,displayOnlyPriorityTasks)
        setTasks(tasks) //to fix - have to use current tasks value
        Keyboard.dismiss
        setInput('')
    }

    const changeHandler = (value) => {
        setInput(value)
    }

    const styles = StyleSheet.create({
        headerWrapper: {
            justifyContent:'space-between',
            marginBottom:25,
            marginLeft:15,
            marginRight:15
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


        counter: {
            backgroundColor:'#53D3AF',
            borderRadius:10,
            fontSize:14,
            width:30,
            height:30,
            fontFamily:'OpenSansBold',
            textAlignVertical:'center',
            textAlign:'center',
            marginLeft:25
        }
    })

 
    return (
        <>
            <View 
                style={{
                    flex:1,
                    paddingTop:20,
                    paddingBottom:25
                }}
            >
                    <View style={{flex:1}}>
                        <View 
                            style={[                                
                                sharedStyles.wrapperInLine,
                                styles.headerWrapper
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
                            data={tasks}
                            showsVerticalScrollIndicator ={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                            return (
                                <ToDoItem item_id={item.id} />
                            )}} 
                        />
                        <Text onPress={() => allTasksDisplay()} style= {styles.header}>
                                Projects
                        </Text>

                    </View> 



                    <Text style={{paddingVertical: 8}}>
                        Add task
                    </Text> 
                    <TextInput 
                        style={{
                            borderColor: 'black', 
                            borderWidth: 1
                        }}
                        name="setTask"
                        onChangeText = {(input) => changeHandler(input)}
                        value={input}
                        onSubmitEditing={(event) => {
                            submitHandler(event)
                        }}
                    />                   
                    
            </View>
            </>

    );
};

export default ToDoDashboad;