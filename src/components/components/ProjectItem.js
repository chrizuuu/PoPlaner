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
import CustomizingHeaderBar from "../Header/CustomizingHeaderBar";


const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        borderTopWidth:1.5,
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
    progressWrapper: {
        marginTop:20,
        paddingHorizontal:5,
    },

    progressBar: {
        flex:1,
        height:20,
        backgroundColor:'#fff',
        borderRadius:5,
    },
    progress: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor:'rgb(83,211,175)',
        borderRadius:5,
    },
    tasksCounter: {
        fontFamily:'OpenSansBold',
        marginLeft:15,
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
        let allProjectTasks = realm.objects("Task").filtered("project._id == $0", this.project._id).length
        let onlyDoneProjectTasks = realm.objects("Task").filtered("project._id == $0 AND isDone = true", this.project._id).length
        let progressPercent = onlyDoneProjectTasks / allProjectTasks 
        return (
            <>
                    <Pressable  onPress={() => this.setProjectPageIsOpen(!this.state.projectPageIsOpen)}>   
                        <View style={[styles.container]}>
                                <Text             
                                    numberOfLines={1}
                                    style={styles.titleTask}
                                >
                                    {this.project.title}
                                </Text> 
                                <View style={styles.progressBar}>
                                    <View style={[styles.progress,{width: 100 * progressPercent + "%"}]} />
                                </View>
                                <Text style={styles.tasksCounter}>
                                {
                                    onlyDoneProjectTasks
                                    + '/' +
                                    allProjectTasks
                                }
                                </Text>
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
                    </Pressable> 
                        
            </>
        );
    }
}
