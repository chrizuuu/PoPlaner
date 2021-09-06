import React, {useState,useEffect,useLayoutEffect} from 'react';
import { View,Text,FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {startOfDay,endOfDay,format,eachDayOfInterval,startOfWeek,endOfWeek, addWeeks } from 'date-fns';

import { useFocusEffect } from '@react-navigation/core';


import realm from '../../../Database/Database';
import FooterList from '../../../components/components/FooterList';
import TaskItem from '../../../components/components/TaskItem';
import { Icon } from 'react-native-elements';



const ScheduleScreen = ({navigation}) => {
    const [tasks,setTasks] = useState(
        realm.objects("Task").filtered('deadlineDate >= $0 && deadlineDate <= $1', startOfDay(new Date()), endOfDay(new Date()))
    )
    const [startWeek,setStartWeek] = useState(startOfWeek(currentDay))
    const [endWeek,setEndWeek] = useState(endOfWeek(currentDay))
    const [currentDay,setCurrentDay] = useState(new Date())
    const [days,setDays] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={styles.header}> 
                    {format(currentDay,"eeee, d LLLL yyyy")}  
                </Text>
    ),})
    ;}, [currentDay]);
    
    useEffect(() => {
        const start = startOfWeek(currentDay)
        const end = endOfWeek(currentDay)
        setStartWeek(start)
        setEndWeek(end)
        setDays(
            eachDayOfInterval({
                start:start,
                end: end
            })
        )
    }, [navigation])

    const changeWeek = (amount) => {
        const start = addWeeks(startWeek,amount)
        const end = addWeeks(endWeek,amount)
        setStartWeek(start)
        setEndWeek(end)
        setDays(
            eachDayOfInterval({
                start:start,
                end: end
            })
        )
    }

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
            <View style={{flexDirection:'row',justifyContent:'space-between',width:"100%"}}>
                <Icon 
                    type="ionico" 
                    name="arrow-back" 
                    style={{flex:1}}
                    onPress={() => changeWeek(-1)}
                />
                <FlatList
                    horizontal
                    keyboardShouldPersistTaps="always"
                    data={days}
                    showsHorizontalScrollIndicator ={false}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={({item,index}) => {
                        return (
                            <TouchableOpacity onPress={() => setCurrentDay(item)} >
                                <View style={{width:50,height:50,borderWidth:1,alignItems:"center",justifyContent:"center",borderColor: item.toLocaleDateString() === currentDay.toLocaleDateString()? "red": "black"}}>
                                    <Text style={{fontFamily:"OpenSansBold",fontSize:16}}> 
                                        {format(item, 'd MM')} 
                                    </Text>
                                </View>
                            </TouchableOpacity>
                    )}} 
                />
                <Icon 
                    type="ionico" 
                    name="arrow-forward" 
                    style={{flex:1}} 
                    onPress={() => changeWeek(1)}
                />
            </View>
            <FooterList 
                leftIcon="add-outline"
                leftIconOnPress={() => console.log('add task')}
            />
        </FlexLayout>
    )
    
}

export default ScheduleScreen