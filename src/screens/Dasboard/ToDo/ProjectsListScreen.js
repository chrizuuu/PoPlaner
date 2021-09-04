import React, {
    useState, 
    useLayoutEffect,
    useEffect,
} from "react";
import {
    Text, 
    FlatList,
    View, 
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import realm,{ 
    getAllProjects, 
} from "../../../Database/Database"
import Modal from "react-native-modal";
import { CommonActions,useNavigationState ,useFocusEffect} from '@react-navigation/native';
import ProjectItem from "../../../components/components/ProjectItem";
import ModalCreateProject from "../../../components/ModalComponents/ModalCreateProject";
import FooterList from "../../../components/components/FooterList";

const ProjectsListScreen = ({navigation}) => {
    const [projects,setProjects] = useState(getAllProjects())
    const [visibleCreateProject,setVisibleCreateProject] = useState(false)
    
    function onRealmChange() {
        setProjects(getAllProjects())
        setVisibleCreateProject(false)
    }

    useFocusEffect(
        React.useCallback(() => {
            setProjects(getAllProjects())
            realm.addListener("change", onRealmChange);
            return () =>  
                realm.removeListener("change",onRealmChange);
        }, [navigation])
    );

    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor:"rgb(244, 244, 244)"
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
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={"handled"}
                    data={projects}
                    showsVerticalScrollIndicator ={false}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({item}) => {
                        return (
                        <Pressable onPress={() => {
                            navigation.dispatch(
                                CommonActions.navigate({
                                    name: "ProjectTasks",
                                    key: item._id.toString(),
                                    params: {
                                        projectId:item._id,
                                        priority:false,
                                        displayProjectProperty:false,
                                    },
                                })
                              );
                            }} 
                        >
                            <ProjectItem item_id={item._id} />
                        </Pressable>
                    )}} 
                />
                <FooterList 
                    leftIcon="add-outline"
                    leftIconOnPress={() => setVisibleCreateProject(true)}
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
        </>
    );
};

export default ProjectsListScreen