import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet, Button, Vibration, TextInput,AsyncStorageStatic,Switch} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {strings,setI18Config} from '../../../translations/translations';
import realm, {getAllTasks} from "../../../components/Helpers/Database";

export default class ToDoItem extends React.Component {

    task = realm.objectForPrimaryKey("Task",this.props.item.id)


    updateIsDone = () => {
        realm.write(() => {
            this.task.isDone = !this.task.isDone;
        })
    }

    render() {
        return (
                <>
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
                      
                     
                    </FlexLayout>
    
                </>
        );
    }
}

