import React, {useState, useCallback} from 'react';
import {SafeAreaView, Text, StatusBar, FlatList, View, TouchableOpacity,TextInput,Keyboard,Switch,StyleSheet,} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout'
import realm, { createTask, getAllTasks } from "../../../Database/Database"
import ToDoItem from './TodoTask';
import { strings } from '../../../translations/translations';
import sharedStyles from '../../../styles/shared';


const ToDoDashboad = () => {
    const [tasks, setTasks] = useState(getAllTasks());
    const [input,setInput] = useState()

    function onRealmChange() {
        console.log("Something changed!");
        setTasks(getAllTasks())
        //setTasks([...realm.objects("Task").sorted("id")]);
      }
      
    realm.addListener("change", onRealmChange);


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


    const submitHandler = (value) => {
        createTask(value.nativeEvent.text)
        setTasks(getAllTasks())
        Keyboard.dismiss
        setInput('')
    }

    const changeHandler = (value) => {
        setInput(value)
    }

    const allTasksDisplay = () => {
        setTasks(realm.objects("Task").sorted("createdDate", "Descending"))

        }
    
    const priorityTasksDisplay = () => {
        setTasks(realm.objects("Task").filtered("priority == true").sorted("createdDate", "Descending"))

    }     

    
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
                            <Text onPress={() => allTasksDisplay()} style= {styles.header}>
                                {strings('allTasks')} 
                            </Text>

                            <Text onPress={() => priorityTasksDisplay()} style= {styles.header}>
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