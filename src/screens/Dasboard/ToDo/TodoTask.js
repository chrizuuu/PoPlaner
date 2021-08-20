import React from "react";
import { View,Text,Keyboard,Pressable,StyleSheet,TextInput} from 'react-native';
import realm from "../../../Database/Database";
import CheckBox from "../../../components/Buttons/CheckBox";
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import HeaderBar from "../../../components/Header/HeaderBar";
import sharedStyles from "../../../styles/shared";
import FlexLayout from "../../../components/Layouts/FlexLayout"
import ToDoSettingsItem from "../../../components/ToDoSettingsItem";
import {strings} from "../../../translations/translations"

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


    styles = StyleSheet.create({

    })


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
                                borderTopWidth:1.5,
                                borderColor:'rgba(28,28,28,0.1)',
                                opacity: isDoneTaskOpacity,
                                backgroundColor:'rgb(255,255,255)'
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
                                        animationIn="slideInRight"
                                        animationOut="slideOutRight"
                                        isVisible={this.state.taskPageIsOpen} 
                                        swipeDirection='right'
                                        onSwipeComplete={() => this.setTaskPageIsOpen(!this.state.taskPageIsOpen)}
                                        onBackdropPress={() => this.setTaskPageIsOpen(!this.state.taskPageIsOpen)}
                                        style={{
                                            height:'100%',
                                            marginRight:0,
                                            marginTop:0,
                                            marginBottom:0,

                                        }} 

                                    >
                                        <FlexLayout>
                                            <HeaderBar
                                                screenName={this.task.title}
                                                headerTextSize={16}
                                                style={{        
                                                    paddingLeft:25,
                                                    paddingRight:25,
                                                }}
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
                                            


                                            <FlexLayout style={{marginTop:20, paddingLeft:12, paddingRight:12,backgroundColor:'rgb(245,245,245)'}}>
                                                <ToDoSettingsItem
                                                    valueIcon = 'calendar-today'
                                                    valueTitle = 'Data?'
                                                    value = {this.task.createdDate.toLocaleDateString() + ' ' + this.task.createdDate.toLocaleTimeString()}
                                                />
                                                <ToDoSettingsItem
                                                    valueIcon = 'outlined-flag'
                                                    valueTitle = 'Kategoria?'
                                                    value = {this.task.category}
                                                />
                                                <ToDoSettingsItem
                                                    valueIcon = 'folder-open'
                                                    valueTitle = 'Projekt?'
                                                    value = {this.task.project}
                                                />
                                                <TextInput 
                                                        style={{textAlignVertical:'top',minHeight:100, maxHeight:300,borderColor: 'rgb(240,240,240)', padding:10, marginTop:20,borderWidth: 1, borderRadius:25,backgroundColor:'rgb(255,255,255)'}}
                                                        name="input"
                                                        multiline={true}
                                                        maxLength={1000}
                                                        defaultValue={this.task.comment}
                                                        onChangeText = {(input) => this.changeHandler(input)}
                                                        onSubmitEditing={() => {
                                                            this.submitHandler()
                                                        }}
                                                        placeholder="Dodaj komentarz..."
                                                />    
                                                <Text style={{padding:10, fontSize:12,fontFamily:'OpenSansReg'}}>
                                                    {strings("taskCreatedAt")}{this.task.createdDate.toLocaleDateString() + ' ' + this.task.createdDate.toLocaleTimeString()}
                                                </Text>
                                            </FlexLayout>
                                        </FlexLayout>
                            </Modal>
                    </Pressable>     
                </>
        );
    }
}

