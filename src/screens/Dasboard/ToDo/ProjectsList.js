import React, {
    useState, 
} from "react";
import {
    Text, 
    FlatList,
    View, 
    StyleSheet,
} from "react-native";
import realm, { 
    getAllProjects,
    createProject 
} from "../../../Database/Database"
import {Icon} from "react-native-elements";
import Modal from "react-native-modal";
import { strings } from "../../../translations/translations";
import sharedStyles from "../../../styles/shared";
import ProjectItem from "../../../components/components/ProjectItem";
import ModalCreateProject from "../../../components/ModalComponents/ModalCreateProject";

const ProjectsList = () => {
    const [projects,setProjects] = useState(getAllProjects())
    const [visibleCreateProject,setVisibleCreateProject] = useState(false)


    function onRealmChange() {
        setProjects(getAllProjects())
        setVisibleCreateProject(false)
      }
      
    realm.addListener("change", onRealmChange);

    const styles = StyleSheet.create({
        headerWrapper: {
            justifyContent:"space-between",
            padding:20,
        },
        header: {
            fontFamily:"OpenSansBold",
            fontSize:18,
            color:"#282828",
        },

        container: {
            flex:1,
            paddingBottom:25,
            backgroundColor:"rgb(244, 244, 244)"
        },
        
        projectsContainer: {
            flex:1,
            borderTopWidth:1,
            borderTopColor:"rgb(200,200,200)"
        },

        textInput: {
            borderColor: "rgb(200,200,200)", 
            backgroundColor:"rgb(245,245,245)",
            height:40,
            color:"black",
            paddingVertical:8,
            paddingHorizontal:25
        },
    })
 
    return (
        <>
            <View style={styles.container} >     
                <View style={styles.projectsContainer}>
                    <View 
                        style={[                                
                            sharedStyles.wrapperInLine,
                            styles.headerWrapper,            
                            ]}
                    >
                        <Text style= {[styles.header]}>
                            {strings("allProjects")}
                        </Text>

                        <Icon 
                            type="material" 
                            name="add"
                            size={28} 
                            onPress={() => setVisibleCreateProject(!visibleCreateProject)}
                        />
                    </View>    
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={"handled"}
                            data={projects}
                            showsVerticalScrollIndicator ={false}
                            keyExtractor={(item) => item._id.toString()}
                            renderItem={({item}) => {
                            return (
                                <ProjectItem item_id={item._id} />
                            )}} 
                        />    
                </View> 
                <Modal 
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    swipeDirection="down"
                    isVisible={visibleCreateProject} 
                    backdropOpacity={0.4}
                    onSwipeComplete={() => setVisibleCreateProject(!visibleCreateProject)}
                    onBackdropPress={() => setVisibleCreateProject(!visibleCreateProject)}

                > 
                    <ModalCreateProject closeFunc={() => setVisibleCreateProject(!visibleCreateProject)} />
                </Modal>
            </View>
            </>

    );
};

export default ProjectsList