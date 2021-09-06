import React, {useState,useEffect,useLayoutEffect} from 'react';
import { View,Text,FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {startOfDay,endOfDay,format,eachDayOfInterval,startOfWeek,endOfWeek, addWeeks } from 'date-fns';
import sharedStyles from '../../../styles/shared';
import colors from "../../../styles/colorsLightTheme"
import { strings } from '../../../translations/translations';
import { useFocusEffect } from '@react-navigation/core';


import realm from '../../../Database/Database';
import FooterList from '../../../components/components/FooterList';
import TaskItem from '../../../components/components/TaskItem';
import { Icon } from 'react-native-elements';



const ScheduleScreen = ({navigation}) => {
    const [tasks,setTasks] = useState()
    const [startWeek,setStartWeek] = useState(startOfWeek(currentDay,{ weekStartsOn: 1 }))
    const [endWeek,setEndWeek] = useState(endOfWeek(currentDay,{ weekStartsOn: 1 }))
    const [currentDay,setCurrentDay] = useState(new Date())
    const [days,setDays] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({ 
            headerTitle: () => (
                <Text style={styles.header}> 
                    {format(currentDay,"eeee, d LLLL yyyy")}  
                </Text>
        ),})
        setTasksHandler(currentDay)
    ;}, [currentDay]);

    useEffect(() => {
        const start = startOfWeek(currentDay,{ weekStartsOn: 1 })
        const end = endOfWeek(currentDay,{ weekStartsOn: 1 })
        setStartWeek(start)
        setEndWeek(end)
        setDays(
            eachDayOfInterval({
                start:start,
                end: end
            })
        )
        setTasksHandler(currentDay)
    }, [navigation,currentDay])

    const setTasksHandler = (date) => {
        setTasks(
            realm.objects("Task").filtered('deadlineDate >= $0 && deadlineDate <= $1', startOfDay(date), endOfDay(date))
        )
    }

    const changeCurrentDay = (selectedDay) => {
        setCurrentDay(selectedDay)
        setTasksHandler(selectedDay)
    }

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
        amount === 1? setCurrentDay(start) : setCurrentDay(end)
    }


    const styles = StyleSheet.create({
        header: {
            textAlign:"center",
            fontSize:16,
            fontFamily:"OpenSansBold"
        },
        footer: {
            alignItems:"center",
            flexDirection:"row",
            width:"100%",
            justifyContent:"space-between",
            backgroundColor:colors.primeColor,
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
            <View style={[styles.footer,sharedStyles.padding10]}>
                <TouchableOpacity onPress={() => changeCurrentDay(new Date())}>
                    <Text style={{fontFamily:"OpenSansBold",fontSize:13,backgroundColor:colors.secondColor,padding:5,borderRadius:5,borderColor:colors.thirdColor,borderWidth:1}}>
                        {strings("calendarToday")}
                    </Text>
                </TouchableOpacity>
                <Icon 
                    type="ionicon"
                    name="add-outline" 
                    size={28} 
                    onPress={() => console.log("add task")}
                />
            </View>
        </FlexLayout>
    )
    
}

export default ScheduleScreen