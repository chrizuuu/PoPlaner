import React, {useState,useEffect,useLayoutEffect,useRef} from 'react';
import { View,Text,FlatList,StyleSheet,TouchableOpacity,TextInput, Keyboard} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {startOfDay,endOfDay,format,eachDayOfInterval,startOfWeek,endOfWeek, addWeeks, isThisWeek,isSameDay } from 'date-fns';
import sharedStyles from '../../../styles/shared';
import colors from "../../../styles/colorsLightTheme"
import { strings } from '../../../translations/translations';
import { useFocusEffect } from '@react-navigation/core';
import realm, {createTask} from '../../../Database/Database';
import FooterList from '../../../components/components/FooterList';
import TaskItem from '../../../components/components/TaskItem';
import { Icon } from 'react-native-elements';

const pl = require("date-fns/locale/pl")

const ScheduleScreen = ({navigation}) => {
    const [tasks,setTasks] = useState()
    const [taskInput,setTaskInput] = useState("")
    const [addFormVisible,setAddFormVisible] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const inputTaskTitle = useRef(null)
    const [days,setDays] = useState()
    const [startWeek,setStartWeek] = useState()
    const [endWeek,setEndWeek] = useState()
    const [modalVisible,setModalVisible] = useState(false)
    const [currentDay,setCurrentDay] = useState(new Date())
    

    const onRealmChange =() => {
        setTasksHandler(currentDay)
    }

    const provideModalVisibleStatus = (taskModalVisibile) =>{
        setModalVisible(taskModalVisibile)
    }

    useEffect(() => {
        setDaysHandler()
        setTasksHandler(currentDay)
    }, [navigation])

    useLayoutEffect(() => {
        navigation.setOptions({ 
            headerTitle: () => (
                <Text style={styles.header}> 
                    {format(currentDay,"EEEE, d LLLL yyyy", {locale: pl})}  
                </Text>
        ),})
    ;}, [currentDay]);

    useEffect(() => {
        setTasksHandler(currentDay)
        if (currentDay <= startWeek || currentDay >= endWeek) {
            setDaysHandler()
        }
        realm.addListener("change", onRealmChange);
        return () =>
            realm.removeAllListeners()
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
        const start = startOfWeek(currentDay,{ locale:pl })
        const end = endOfWeek(currentDay,{ locale:pl })

        setStartWeek(start)
        setEndWeek(end)
        setDays(
            eachDayOfInterval({
                start:start,
                end: end
            })
        )
    }

    const handleAddFormVisibile = () => {
        setAddFormVisible(true)
        setTimeout(() => inputTaskTitle.current.focus(), 0)
    }

    const addFormDismiss = () => {
        setAddFormVisible(false)
        Keyboard.dismiss()
    } 
    const submitTaskHandler = (value) => {
        if (value.nativeEvent.text !== "" && value.nativeEvent.text.trim().length > 0) {
            createTask(value.nativeEvent.text,false,null,currentDay)
            setErrorStatus(false)
            setTasks(tasks)
            setTaskInput("")
            addFormDismiss()
        }
        else {
            setErrorStatus(true)
            setTimeout(() => inputTaskTitle.current.focus(), 0)
        }
    }

    const taskCreateInputHandler = (value) => {
        if (value !== "" && value.trim().length > 0) {
            setErrorStatus(false)
            setTaskInput(value)
        }
        else {
            setErrorStatus(true)
            setTaskInput(value)
        }
    }

    const backdropHandler = () => {
        if (taskInput !== "" && taskInput.trim().length > 0) {
            Keyboard.dismiss()
        }
        else {
            setErrorStatus(false)
            setAddFormVisible(false)
        }
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
        },
        textInputContainer: {
            transform: addFormVisible? [{translateY:0}] :[ {translateY:-60}],
            display:addFormVisible? 'flex': 'none',
            flexDirection:'row',
            alignItems:'center',
            borderColor: colors.thirdColor,
            borderWidth:1, 
            borderRadius:5,
            backgroundColor:colors.primeColor,
            width:'90%',
            height:40,
            paddingHorizontal:5,
            color:colors.textColor,
            marginHorizontal:15,
            marginVertical:10,
        },
    })


    return (
        <FlexLayout>
            <FlatList
                keyboardShouldPersistTaps="always"
                ListHeaderComponent={
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
                        {errorStatus === true 
                            ? (
                                <ErrorText errorValue={strings("inputEmptyError")} />
                            ) 
                            : null  
                        }        
                    </>
                }
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
                                <View style={[styles.calendarListItem,{backgroundColor: isSameDay(item,currentDay)? "#53D3AF" : colors.primeColor}]}>
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
                    onPress={() =>  handleAddFormVisibile()}
                />
            </View>
        </FlexLayout>
    )
    
}

export default ScheduleScreen