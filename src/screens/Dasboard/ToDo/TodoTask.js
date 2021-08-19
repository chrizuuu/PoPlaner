import React from "react";
import { View,Text,Keyboard,Pressable} from 'react-native';
import realm from "../../../Database/Database";
import CheckBox from "../../../components/Buttons/CheckBox";
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import HeaderBar from "../../../components/Header/HeaderBar";
import sharedStyles from "../../../styles/shared";
import TestHeader from "../../../components/Header/TestHeader";
import FlexLayoyt from "../../../components/Layouts/FlexLayout"

export default class ToDoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputComment: null,
            taskPageIsOpen: false,
        }
    }
    task = realm.objectForPrimaryKey("Task",this.props.item_id)

    changeHandler = (value) => {
        this.setState({inputComment:value})
    }

    submitHandler = () => {
        realm.write(() => {
            this.task.comment = this.state.inputComment;
        })       
         Keyboard.dismiss
    }

    changePriority = (priority) => {
        realm.write(() => {
            this.task.priority = !this.task.priority;
        })  
    }

    updateIsDone = () => {
        realm.write(() => {
            this.task.isDone = !this.task.isDone;
        })
    }

    deleteTask = () => {
        realm.write(() => {
         realm.delete(this.task);
        });
      };

    setTaskPageIsOpen = (visible) => {
        this.setState({
            taskPageIsOpen: visible
        })
    }


    render() {
        let priorityTaskStatus = this.task.priority === true
            ? 
                {color:'rgba(83,211,175,1)',
                icon:'star'}
            : 
                {color:'rgba(48,48,48,0.3)',
                icon:'star-border'}

        let isDoneTaskOpacity = this.task.isDone === true
            ? 0.4
            : 1

        return (
                <>
                    <Pressable  onPress={() => this.setTaskPageIsOpen(!this.state.taskPageIsOpen)}>          
                        <View 
                            style={{
                                flex:1,
                                borderTopWidth:1,
                                borderColor:'rgba(28,28,28,0.1)',
                                opacity: isDoneTaskOpacity,
                        }}>
                            <View 
                                style={{
                                    flex:1,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    padding:12
                                }}
                            > 
                                <CheckBox 
                                    status={this.task.isDone} 
                                    onChange={() => this.updateIsDone()}
                                    style={{marginRight:20}} 
                                />                                    
                                <Text             
                                    numberOfLines={1}
                                    style={{
                                        flex:1,
                                        fontSize:14,
                                        fontFamily:"OpenSansReg",
                                        color:'#282828',
                                        overflow:'hidden' 
                                    }}
                                >
                                    {this.task.title}
                                </Text> 
                                <Icon 
                                    type='material' 
                                    name={priorityTaskStatus.icon}
                                    iconStyle = {{
                                        marginLeft:15,
                                        color:priorityTaskStatus.color
                                    }} 
                                    size={28} 
                                    onPress = {() => this.changePriority()}
                                />
                            </View>
                        </View>
                                
                                    <Modal 
                                        useNativeDriver={true}
                                        animationIn='slideInRight'
                                        animationOut='slideOutRight'
                                        isVisible={this.state.taskPageIsOpen} 
                                        onBackdropPress={() => this.setTaskPageIsOpen(!this.state.taskPageIsOpen)}
                                        style={{
                                            backgroundColor: "rgba(245,245,245,1)",
                                            height:'100%',
                                            width:'90%',
                                            position:'absolute',
                                            right:0,
                                            margin:0,
                                        }} 

                                    >
                                    <FlexLayoyt>
                                        <TestHeader
                                            screenName={this.task.title}
                                            headerTextSize={16}
                                            leftIcon={
                                                <CheckBox 
                                                    status={this.task.isDone} 
                                                    onChange={() => this.updateIsDone()}
                                                    style={{marginRight:20}} 
                                                />  
                                            }
                                            rightIcon={
                                                <Icon 
                                                    type='material' 
                                                    name={priorityTaskStatus.icon}
                                                    iconStyle = {{
                                                        color:priorityTaskStatus.color
                                                    }} 
                                                    size={28} 
                                                    onPress = {() => this.changePriority()}
                                                />
                                            }
                                        />
                                    </FlexLayoyt>
                            </Modal>
                    </Pressable>     
                </>
        );
    }
}

