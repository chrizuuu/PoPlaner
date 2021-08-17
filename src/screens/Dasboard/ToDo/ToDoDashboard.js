import React, {useState, useCallback} from 'react';
import {SafeAreaView, Text, StatusBar, FlatList, View, TouchableOpacity,TextInput,Keyboard,Switch,StyleSheet,} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout'
import realm, { createTask, getAllTasks } from "../../../components/Helpers/Database"
import ToDoItem from './TodoTask';
import { strings } from '../../../translations/translations';
import sharedStyles from '../../../styles/shared';


const ToDoDashboad = () => {
    const [tasks, setTasks] = useState(getAllTasks());
    const [input,setInput] = useState()


    const styles = StyleSheet.create({
        header: {
            fontFamily:"OpenSansBold",
            fontSize:18,
            color:"#282828"
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

    function onRealmChange() {
        console.log("Something changed!");
        setTasks(getAllTasks())
        //setTasks([...realm.objects("Task").sorted("id")]);

      }
      
      realm.addListener("change", onRealmChange);
      
    return (
    <>
    <View style={{flex:1,paddingTop:50, paddingBottom:25}}>
            <Text 
                style={{paddingVertical: 8}}>
                Add task
            </Text> 

            <TextInput 
                style={{borderColor: 'black', borderWidth: 1}}
                name="setTask"
                onChangeText = {(input) => changeHandler(input)}
                value={input}
                onSubmitEditing={(event) => {
                    submitHandler(event)
                }}
            />

            <View style={{flex:1}}>
                <View 
                    style={[
                    sharedStyles.wrapperInLine,
                    {justifyContent:'space-between',
                    marginBottom:25,marginLeft:10,marginRight:10

                    }
                ]}>
                    <Text style= {styles.header}>
                        {strings('allTasks')} 
                    </Text>
                    <Text style= {styles.header}>
                        Priority Tasks 
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
            </View> 
            
    </View>
    </>

    );
};

export default ToDoDashboad;