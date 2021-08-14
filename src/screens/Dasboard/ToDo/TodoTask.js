import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet, Button, Vibration, TextInput,AsyncStorageStatic,Switch,Keyboard} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {strings,setI18Config} from '../../../translations/translations';
import realm, {getAllTasks} from "../../../components/Helpers/Database";

export default class ToDoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputComment: null,
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


    updateIsDone = () => {
        realm.write(() => {
            this.task.isDone = !this.task.isDone;
        })
    }

    deleteTask = () => {
        realm.write(() => {
         realm.delete(this.task);
         console.log('delete')
        });
      };


    render() {
        return (
                <>
                <Text>{this.state.inputComment}</Text>
                    <FlexLayout 
                        style={{
                            borderColor:'black',
                            borderWidth:1,
                            flexDirection:'row',
                            alignItems:'center',
                            padding:5,
                            marginTop:5,
                        
                    }}>
                        <Text style={{flex:5}}>
                            {this.task.title}
                        </Text>
                        <Text >
                            {
                            this.task.isDone === true 
                            ?
                            "Completed "
                            :
                            "In Progress "
                            }
                        </Text>
                        <Switch 
                            value={this.task.isDone} 
                            onValueChange={() => this.updateIsDone()}
                        />                
                        <Text onPress={() => this.deleteTask()} > Delete</Text>
                         
                    </FlexLayout>
                    <TextInput 
                            style={{borderColor: 'black', borderWidth: 1}}
                            name="input"
                            defaultValue={this.task.comment}
                            onChangeText = {(input) => this.changeHandler(input)}
                            onSubmitEditing={() => {
                                this.submitHandler()
                            }}
                                    />        
    
                </>
        );
    }
}

