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

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
        paddingVertical:12,
        flexDirection:'row',
        borderTopWidth:1,
        backgroundColor:'rgb(255,255,255)',
        borderColor:'rgba(28,28,28,0.1)',
        justifyContent:'space-between',
        alignItems:'center',
    },
    titleTask: {
        flex:2,
        fontSize:16,
        fontFamily:"OpenSansSemiBold",
        color:'#282828',
        overflow:'hidden', 
    },

    modalStyle: {
        height:'100%',
        marginRight:0,
        marginTop:0,
        marginBottom:0,
        backgroundColor:'rgb(255,255,255)',
    },

    commentInput:{
        textAlignVertical:'top',
        minHeight:100,
        maxHeight:300,
        borderColor: 'rgb(240,240,240)', 
        padding:10,
        borderWidth: 1, 
        borderRadius:25,
        backgroundColor:'rgb(255,255,255)'
    },
})

export default class ProjectItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputTitle: this.project.title,
            errorInputTitle:false,
            projectPageIsOpen: false,
            taskToDoInProject:realm.objects("Task").filtered("project._id == $0 AND isDone = false", this.project._id).length
        }
    }
    project = realm.objectForPrimaryKey("Project",this.props.item_id)

    setProjectPageIsOpen = (visible) => {
        this.setState({
            projectPageIsOpen: visible,
        })
    }

    changeTitleHandler = (value) => {
        this.setState({inputTitle:value})
    }

    submitTitleHandler = () => {
        if (this.state.inputTitle !== "" & this.state.inputTitle.trim().length > 0) {
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
                <Modal 
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={this.state.projectPageIsOpen} 
                    swipeDirection='right'
                    onSwipeComplete={() => this.setProjectPageIsOpen(!this.state.projectPageIsOpen)}
                    onBackdropPress={() => this.setProjectPageIsOpen(!this.state.projectPageIsOpen)}
                    style={styles.modalStyle} 
                > 
                    <FlexLayout>
                        <View style={sharedStyles.wrapperInLine}>
                            <TextInput 
                                style={[styles.titleTask,{marginLeft:25}]}
                                name="input"
                                maxLength={100}
                                defaultValue={this.project.title}
                                onChangeText = {(input) => this.changeTitleHandler(input)}
                                onSubmitEditing={() => {
                                    this.submitTitleHandler()
                                }}
                            />    
                        </View>
                    </FlexLayout>
                </Modal>
            </>
        );
    }
}
