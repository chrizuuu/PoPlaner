import React from "react";
import { View,
    Text,
    Pressable,
    StyleSheet,
    TextInput,
    ScrollView,
    Keyboard,
} 
from 'react-native';
import realm from "../../Database/Database";
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import sharedStyles from "../../styles/shared";
import FlexLayout from "../Layouts/FlexLayout";
import CounterTasks from "./CounterTasks";
import colors from "../../styles/colorsLightTheme"

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
        paddingVertical:12,
        flexDirection:'row',
        borderTopWidth:1,
        backgroundColor:colors.primeColor,
        borderColor:colors.secondColor,
        justifyContent:'space-between',
        alignItems:'center',
    },
    titleTask: {
        flex:2,
        fontSize:16,
        fontFamily:"OpenSansSemiBold",
        color:colors.textColor,
        overflow:'hidden', 
    },

})

export default class ProjectItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputTitle: this.project.title,
            errorInputTitle:false,
            taskToDoInProject:realm.objects("Task").filtered("project._id == $0 AND isDone = false", this.project._id).length
        }
    }
    project = realm.objectForPrimaryKey("Project",this.props.item_id)

    changeTitleHandler = (value) => {
        this.setState({inputTitle:value})
    }

    submitTitleHandler = () => {
        if (this.state.inputTitle !== "" && this.state.inputTitle.trim().length > 0) {
            realm.write(() => {
                this.project.title = this.state.inputTitle;
            })       
            Keyboard.dismiss()
            this.setState({
                errorInputTitle:false
            })
        }
        else {
            this.setState({
                errorInputTitle:true
            })
        }
    }

    render() {
        return (
            <>
                <View style={[styles.container]}>
                    <Text             
                        numberOfLines={1}
                        style={styles.titleTask}
                    >
                        {this.project.title}
                    </Text> 
                    <CounterTasks 
                        project={this.project._id}
                        backgroundColor="rgb(83,211,175)" />
                </View>  
            </>
        );
    }
}
