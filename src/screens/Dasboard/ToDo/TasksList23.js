import React, {
    useState, 
    useLayoutEffect,
    useRef,
    useEffect
} from "react";
import {
    FlatList,
    View, 
    TextInput,
    Keyboard,
    StyleSheet,
    Dimensions,
    Pressable,
    Text
} from "react-native";
import realm, { 
    createTask, 
    getProjectTasks
} from "../../../Database/Database"
import {Icon} from 'react-native-elements';
import TaskItem from "../../../components/components/TaskItem"
import { strings } from "../../../translations/translations";
import ErrorText from "../../../components/Text/ErrorText";
import { TouchableOpacity } from "react-native-gesture-handler";


const windowHeight = Dimensions.get('window').height;

export default class TasksList23 extends React.Component {
    constructor(props) {
        super(props);
        const project = this.props.route.paramsz
        const getTasks = () => getProjectTasks(project)
        this.state = {
            tasks:getTasks(),
            taskInput:"",
            addFormVisible:false,
            backdropActive:false,
            errorStatus:false,
        }
    }
      


    styles = StyleSheet.create({
        container: {
            flex:1,
            width:'100%',
            height: windowHeight,
            backgroundColor:"rgb(244, 244, 244)",
            marginBottom:5
        },

        textInputContainer: {
            flexDirection:'row',
            alignItems:'center',
            borderColor: "rgb(48,48,48)",
            borderWidth:1, 
            borderRadius:5,
            backgroundColor:"rgb(255,255,255)",
            width:'90%',
            height:40,
            paddingHorizontal:5,
            color:"black",
            marginHorizontal:15,
            marginVertical:10,
        },
        listFooter: {
            height:40,
            width:'100%',
            backgroundColor:"rgb(255,255,255)",
            borderTopWidth:1,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        },
        backdropPressable: {
            position:'absolute',
            width:'100%',
            height:'100%',
            top:60,
        }
    })
    render() {
        return (
            <>
                <View style={this.styles.container}>
                    <Text> {this.props.rute.params? 'tak' : 'nie'} </Text>
                    
                </View>
            </>
        );
    }
  }

