import React from "react";
import { View,
    Text,
    Pressable,
    StyleSheet,
    TextInput,
    ScrollView} 
from 'react-native';
import realm from "../../Database/Database";
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import sharedStyles from "../../styles/shared";


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgb(230,230,230)',
        paddingHorizontal:10,
        paddingVertical:25,
        margin:10,
        borderRadius:15,
        maxHeight:200,
        minWidth:200,
    },
    wrapperInRow: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    titleTask: {
        flex:1,
        fontSize:16,
        fontFamily:"OpenSansBold",
        color:'#282828',
        overflow:'hidden', 
    },
    date: {
        flex:1,
        fontSize:14,
        fontFamily:"OpenSansReg",
        color:'#282828',
        overflow:'hidden', 
    },
    progressWrapper: {
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

    textInputStyle:{
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
            projectPageIsOpen: false,
        }
    }
    project = realm.objectForPrimaryKey("Project",this.props.item_id)

    setProjectPageIsOpen = (visible) => {
        this.setState({
            projectPageIsOpen: visible
        })
    }

    render() {
        let allProjectTasks = realm.objects("Task").filtered("project.id == $0", this.project.id).length
        let onlyDoneProjectTasks = realm.objects("Task").filtered("project.id == $0 AND isDone = true", this.project.id).length
        let progressPercent = onlyDoneProjectTasks / allProjectTasks 
        return (
            <>
                    <Pressable  onPress={() => this.setProjectPageIsOpen(!this.state.projectPageIsOpen)}>   
                        <View style={[styles.container]}>
                            <View style={[styles.wrapperInRow]}>                 
                                <Text             
                                    numberOfLines={1}
                                    style={styles.titleTask}
                                >
                                    {this.project.title}
                                </Text> 
                                <Icon 
                                    type='material' 
                                    name='more-horiz'
                                    size={28} 
                                />
                            </View>

                            <Text style={styles.date}>
                                {this.project.createdDate.toLocaleDateString()}
                            </Text>

                            <View style={[styles.wrapperInRow,styles.progressWrapper]}>
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
                        </Modal>
                    </Pressable>     
            </>
        );
    }
}
