import React, {useState} from 'react';
import {SafeAreaView, Text, StatusBar, FlatList, View, TouchableOpacity} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout'
import realm, { createTask, getAllTasks } from "../../../components/Helpers/Database"


const ToDoDashboad = () => {
    const [tasks, setTask] = useState(getAllTasks());

    return (
    <>
    <FlexLayout>
            <Text 
                style={{paddingVertical: 8}}
                onPress={() => {
                createTask("Chronicles of JavaScript")
                setTask(getAllTasks())
            }}>
                Add task
            </Text> 

            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                return (
                <FlexLayout>
                    <Text>{item.title}</Text>
                    <Text>{item.isDone.toString()}</Text>
                    <Text>{item.createdDate}</Text>
                </FlexLayout>
                )
            }} />
    </FlexLayout>
    </>

    );
};

export default ToDoDashboad;