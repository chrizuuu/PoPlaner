import React, {useState, useCallback} from 'react';
import {SafeAreaView, Text, StatusBar, FlatList, View, TouchableOpacity,TextInput,Keyboard,Switch} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout'
import realm, { createTask, getAllTasks } from "../../../components/Helpers/Database"


const ToDoDashboad = () => {
    const [tasks, setTasks] = useState(getAllTasks());
    const [input,setInput] = useState()

    const submitHandler = (value) => {
        createTask(value.nativeEvent.text)
        setTasks(getAllTasks())
        Keyboard.dismiss
        setInput('')
    }

    const changeHandler = (value) => {
        setInput(value)
    }

    const deleteTask = (task) => {
        realm.write(() => {
         realm.delete(task);
          setTasks([...realm.objects("Task").sorted("id")]);
        });
      };
      
    return (
    <>
    <FlexLayout>
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

            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                return (
                <FlexLayout style={{borderColor:'black',borderWidth:1,flexDirection:'row',alignItems:'center',padding:5,marginTop:5,}}>
                    <Text style={{flex:5}}>
                        {item.title}
                    </Text>
                    <Text style={{flex:1}} >
                        {item.isDone.toString()}
                    </Text>
                    <Text onPress={()=>deleteTask(item)}> Delete</Text>

                </FlexLayout>
                )
            }} />
    </FlexLayout>
    </>

    );
};

export default ToDoDashboad;