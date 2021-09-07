import React, {useState,useEffect,useLayoutEffect} from 'react';
import { View,Text,FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {startOfDay,endOfDay,format,eachDayOfInterval,startOfWeek,endOfWeek, addWeeks, isThisWeek } from 'date-fns';
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
    const [days,setDays] = useState()
    const [startWeek,setStartWeek] = useState(startOfWeek(currentDay,{ weekStartsOn: 1 }))
    const [endWeek,setEndWeek] = useState(endOfWeek(currentDay,{ weekStartsOn: 1 }))
    const [modalVisible,setModalVisible] = useState(false)
    const [currentDay,setCurrentDay] = useState(new Date())

    function onRealmChange() {
        setTasksHandler(currentDay)
    }

    const provideModalVisibleStatus = (taskModalVisibile) =>{
        setModalVisible(taskModalVisibile)
    }

    useFocusEffect(
        React.useCallback(() => {
            realm.addListener("change", onRealmChange);
            return () => 
                realm.removeListener("change",onRealmChange);
        }, [navigation])
    );

    useEffect(() => {
        setDaysHandler()
        setTasksHandler(currentDay)
    }, [navigation])

    useLayoutEffect(() => {
        navigation.setOptions({ 
            headerTitle: () => (
                <Text style={styles.header}> 
                    {format(currentDay,"eeee, d LLLL yyyy")}  
                </Text>
        ),})
    ;}, [currentDay]);

    useEffect(() => {
        if (currentDay <= startWeek || currentDay >= endWeek) {
            setDaysHandler()
        }
        setTasksHandler(currentDay)

    }, [currentDay])


    const setTasksHandler = (date) => {
        setTasks(
            realm.objects("Task").filtered('deadlineDate >= $0 && deadlineDate <= $1', startOfDay(date), endOfDay(date))
        )
    }

    const changeWeek = (amount) => {
        const start = addWeeks(startWeek,amount)
        const end = addWeeks(endWeek,amount)
        amount === 1? setCurrentDay(start) : setCurrentDay(end)
    }

    const setDaysHandler = () => {
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
        },
        calendarMenu: {
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:"center",
            backgroundColor:colors.primeColor,
            borderBottomColor:colors.secondColor,
            borderBottomWidth:1,
            borderTopColor:colors.secondColor,
            borderTopWidth:1,
        },
        calendarListItem: {
            padding:10,
        },
        todayBtn: {
            fontFamily:"OpenSansBold",
            fontSize:14,
            padding:5,
            marginLeft:5,
            borderRadius:5,
        }
    })


    return (
        <FlexLayout>
            <FlatList
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
                            provideModalVisibleStatus={provideModalVisibleStatus} 
                            item_id={item._id} 
                            displayProjectProperty={true} 
                        />
                )}} 
            />
            <View style={styles.calendarMenu}>
                <Icon 
                    type="ionico" 
                    name="arrow-back" 
                    containerStyle={{padding:10}}
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
                                <View style={[styles.calendarListItem,{backgroundColor: item.toLocaleDateString() === currentDay.toLocaleDateString()? "#53D3AF" : colors.primeColor}]}>
                                    <Text style={{fontFamily:"OpenSansReg",fontSize:15}}> 
                                        {format(item, 'd/MM')} 
                                    </Text>
                                </View>
                            </TouchableOpacity>
                    )}} 
                />
                <Icon 
                    type="ionico" 
                    name="arrow-forward" 
                    containerStyle={{padding:10}}
                    onPress={() => changeWeek(1)}
                />
            </View>
            <View style={[styles.footer,sharedStyles.padding10]}>
                <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} onPress={() => setCurrentDay(new Date())}>
                    <Icon 
                        type="ionicon"
                        name="today-outline" 
                    />
                    <Text style={styles.todayBtn}>
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