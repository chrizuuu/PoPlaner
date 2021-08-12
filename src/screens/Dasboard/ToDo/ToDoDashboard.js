import React, {useState} from 'react';
import {SafeAreaView, Text, StatusBar, FlatList, View, TouchableOpacity,TextInput,Keyboard} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout'
import realm, { createTask, getAllTasks } from "../../../components/Helpers/Database"


const ToDoDashboad = () => {
    const [tasks, setTask] = useState(getAllTasks());
    const [input,setInput] = useState()

    const submitHandler = (value) => {
        createTask(value.nativeEvent.text)
        setTask(getAllTasks())
        Keyboard.dismiss
        setInput('')
    }

    const changeHandler = (value) => {
        setInput(value)
    }

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
                <FlexLayout>
                    <Text>{item.title}</Text>
                    <Text>{item.isDone.toString()}</Text>
                    <Text>{item.createdDate.toString()}</Text>
                </FlexLayout>
                )
            }} />
    </FlexLayout>
    </>

    );
};

export default ToDoDashboad;