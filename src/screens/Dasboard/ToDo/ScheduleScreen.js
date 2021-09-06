import React, {useState,useLayoutEffect} from 'react';
import { View,Text,FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {startOfDay,endOfDay,format } from 'date-fns';
import eachDayOfInterval from "date-fns/eachDayOfInterval"

import { useFocusEffect } from '@react-navigation/core';
import startOfWeek from 'date-fns/startOfWeek'


import realm from '../../../Database/Database';
import FooterList from '../../../components/components/FooterList';
import TaskItem from '../../../components/components/TaskItem';
import { Icon } from 'react-native-elements';



const ScheduleScreen = ({navigation}) => {
    const [tasks,setTasks] = useState(
        realm.objects("Task").filtered('deadlineDate >= $0 && deadlineDate <= $1', startOfDay(new Date()), endOfDay(new Date()))
    )
    const [startOfWeek,setStartOfWeek] = useState(startOfWeek(currentDay))
    const [endOfWeek,setEndOfWeek] = useState(endOfWeek(currentDay))
    const [currentDay,setCurrentDay] = useState(new Date())

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.header}> 
                    {format(currentDay,"eeee, d LLLL")}  
                </Text>
    ),});}, [currentDay]);

    const styles = StyleSheet.create({
        header: {
            textAlign:"center",
            fontSize:16,
            fontFamily:"OpenSansBold"
        }
    })


    return (
        <FlexLayout>
            <FlatList
                style={{flex:1}}
                keyboardShouldPersistTaps="always"
                /*ListHeaderComponent={
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
                        {taskInputErrorStatus === true 
                            ? (
                                <ErrorText errorValue={strings("inputEmptyError")} />
                            ) 
                            : null  
                        }        
                    </>
                }
                */
                data={tasks}
                showsVerticalScrollIndicator ={false}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({item}) => {
                    return (
                        <TaskItem 
                            item_id={item._id} 
                            displayProjectProperty={true} 
                        />
                )}} 
            />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Icon />
                <FlatList
                    horizontal
                    style={{flex:1}}
                    keyboardShouldPersistTaps="always"
                    data={eachDayOfInterval({
                        start: new Date(2021, 8, 1),
                        end: new Date(2021, 8, 7)
                    })}
                    showsHorizontalScrollIndicator ={false}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={({item,index}) => {
                        return (
                            <TouchableOpacity onPress={() => setCurrentDay(item)} >
                                <View style={{height:50,width:50,borderWidth:1,alignItems:"center",justifyContent:"center",borderColor: item.toLocaleDateString() === currentDay.toLocaleDateString()? "red": "black"}}>
                                    <Text style={{fontFamily:"OpenSansBold",fontSize:16}}> 
                                        {format(item, 'd')} 
                                    </Text>
                                </View>
                            </TouchableOpacity>
                    )}} 
                />
                <Icon />
            </View>
            <FooterList 
                leftIcon="add-outline"
                leftIconOnPress={() => console.log('add task')}
            />
        </FlexLayout>
    )
    
}

export default ScheduleScreen