import React, {useState, useCallback} from 'react';
import {SafeAreaView, Text, StatusBar, FlatList, View, TouchableOpacity,TextInput,Keyboard,Switch} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout'
import realm, { createTask, getAllTasks } from "../../../components/Helpers/Database"
import ToDoItem from './TodoTask';


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

    const updateIsDone = (task) => {
        realm.write(() => {
            task.isDone = !task.isDone;
            setTasks(getAllTasks())
        })
    }

    const onChangeComment = (task,value) => {
        realm.write(() => {
            task.comment = value.target.text;
        })
    }


    function onRealmChange() {
        console.log("Something changed!");
        setTasks(getAllTasks())
      }
      // Add the listener callback to the realm
      realm.addListener("change", onRealmChange);
      
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
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => {
                return (
                <>
                    <ToDoItem key={item.id} item_id={item.id} />
                </>
                )
            }} />
    </FlexLayout>
    </>

    );
};

export default ToDoDashboad;