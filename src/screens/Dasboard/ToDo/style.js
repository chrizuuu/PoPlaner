import React from "react";
import { StyleSheet,Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height;

const ToDoSTyles = StyleSheet.create({
    tasksListContainer: {
        flex:1,
        width:'100%',
        height: windowHeight,
        backgroundColor:"rgb(244, 244, 244)",
    },
    backdropPressable: {
        position:'absolute',
        width:'100%',
        height:'100%',
        top:60,
    },

})

export default ToDoSTyles