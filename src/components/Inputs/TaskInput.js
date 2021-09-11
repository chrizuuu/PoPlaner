import React, {useState,useRef,forwardRef, useImperativeHandle} from "react"
import {View,TextInput,StyleSheet, Pressable,Keyboard} from "react-native"
import { Icon } from "react-native-elements"
import {createTask} from "../../Database/Database"
import { strings } from "../../translations/translations"
import colors from "../../styles/colorsLightTheme"
import ErrorText from "../Text/ErrorText"


const TaskInput = forwardRef((props,ref) => {
    const [addFormVisible,setAddFormVisible] = useState(false)
    const [errorStatus,setErrorStatus] = useState(false)
    const [inputValue,setInputValue] = useState("")
    const inputTask = useRef(null)

    useImperativeHandle(ref, () => {
        return {
            addFormDismiss: addFormDismiss,
            addFormSetVisible: addFormSetVisible
        };
      });

    const submitTaskHandler = () => {
        if (inputValue !== "" && inputValue.trim().length > 0) {
            createTask(inputValue,props.priority,props.project,props.date)
            setErrorStatus(false)
            setInputValue("")
            addFormDismiss()
        }
        else {
            setErrorStatus(true)
            setTimeout(() => inputTask.current.focus(), 0)
        }
    }

    const inputValueHandler = (value) => {
        setInputValue(value)
        if (value !== "" && value.trim().length > 0) {
            setErrorStatus(false)
        }
        else {
            setErrorStatus(true)
        }
    }

    const addFormSetVisible = () => {
        setAddFormVisible(true)
        setTimeout(() => inputTask.current.focus(), 0)
    }

    const addFormDismiss = () => {
        setAddFormVisible(false)
        Keyboard.dismiss()
    } 

    const backdropHandler = () => {
        if (inputValue !== "" && inputValue.trim().length > 0) {
            Keyboard.dismiss()
        }
        else {
            setErrorStatus(false)                  
            setAddFormVisible(false)
        }
    }

    const styles = StyleSheet.create({
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

        backdropPressable: {
            position:'absolute',
            width:'100%',
            height:'100%',
            top:60,
            backgroundColor:"red"
        },
    })

    return (
        <>
            <View style={[styles.textInputContainer]}>
                <Icon 
                    size={32} 
                    type='ionicon' 
                    name='close-outline' 
                    style={{marginRight:10,}} 
                    onPress={() =>addFormDismiss() }
                />
                <TextInput 
                    style={{flex:1}}
                    placeholder={strings("taskAddForm")}
                    onChangeText = {(taskInput) => inputValueHandler(taskInput)}
                    value={inputValue}
                    onSubmitEditing={(event) => {
                        submitTaskHandler(event)
                    }}
                    ref={inputTask}
                />
            </View>
            {errorStatus === true 
                ? (
                    <ErrorText errorValue={strings("inputEmptyError")} />
                ) 
                : null  
            }
            {addFormVisible
            ?    
            <>
                <Pressable 
                    onPress={() => backdropHandler()} 
                    style={styles.backdropPressable} 
                />
            </>
            : null
            }        
        </>
    )
})

export default TaskInput