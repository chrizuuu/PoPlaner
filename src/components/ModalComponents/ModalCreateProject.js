import React, {useState} from "react";
import {
    Text, 
    FlatList,
    View, 
    TextInput,
    Keyboard,
    StyleSheet,
    ScrollView
} from "react-native";
import PropertyItem from "../components/PropertyItem";
import sharedStyles from "../../styles/shared";
import { strings } from "../../translations/translations";
import { createProject } from "../../Database/Database";
import ErrorText from "../../components/Text/ErrorText";
import colors from "../../styles/colorsLightTheme"
import { color } from "react-native-reanimated";


const ModalCreateProject = ({closeFunc}) => {
    const [titleInput,setTitleInput] = useState("")
    const [descriptionInput,setDescriptionInput] = useState()
    const [titleInputError,setTitleInputError] = useState(false)

    const submitProject = (value) => {
        if (titleInput !== "" & titleInput.trim().length > 0) {
            setTitleInputError(false)
            createProject(titleInput,descriptionInput)
            Keyboard.dismiss()
            setTitleInput("")
            setDescriptionInput("")
        }
        else {
            setTitleInputError(true)
        }
    }

    const titleInputHandler = (value) => {
        setTitleInput(value)
    }

    const descriptionInputHandler = (value) => {
        setDescriptionInput(value)
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
        },
        wrapper: {
            width: "100%",
            backgroundColor:colors.primeColor,
        },
        headerWrapper: {
            fontFamily: "OpenSansSemiBold",
            textAlign:"center",
            color:colors.textColor,
            backgroundColor:colors.secondColor
        },
        headerProperties:{
            fontFamily: "OpenSansReg",
            color:colors.textColor,
            textAlign:"left",
            backgroundColor:colors.secondColor,
            paddingHorizontal:15,
            paddingVertical:10,
        },

        titleInput: {
            borderColor: colors.thirdColor,
            borderWidth:1,
            height:40,
            color:colors.textColor,
            paddingVertical:8,
            paddingHorizontal:15,
            marginVertical:10,
            marginHorizontal:15
        },
        commentInput: {
            textAlignVertical:'top',
            minHeight:100,
            maxHeight:300,
            borderColor: colors.thirdColor,
            padding:10,
            marginVertical:15,
            borderWidth: 1, 
            borderRadius:25,
            backgroundColor:colors.primeColor,
        },

        propertiesWrapper: {
            marginHorizontal:15,
        },

        footerWrapper: {
            borderTopWidth:1,
            borderTopColor:colors.secondColor,
            justifyContent:'space-evenly',
        },
        footerItems: {
            padding:15,
            textAlign:'center',
            textAlignVertical:'center',
            height:'100%',
            width:'50%',
        },
        footerLeftItem: {
            borderRightWidth:0.5,
            borderRightColor:colors.secondColor,
        },
        footerRighItem: {
            borderLeftWidth:0.5,
            borderLeftColor:colors.secondColor,
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={[styles.headerWrapper,sharedStyles.padding10]}>
                    {strings("createProject")}
                </Text>
                <TextInput 
                    style={styles.titleInput}
                    placeholder={strings("createProjectTitle")}
                    onChangeText = {(titleInput) => titleInputHandler(titleInput)}
                    value={titleInput}
                />
                {titleInputError === true 
                ? (
                    <ErrorText errorValue={strings("inputEmptyError")} />
                ) 
                : null  
                }   

                <Text style={[styles.headerProperties]}>
                    {strings("createProjectPropertiesHeader")}
                </Text>
                <View style={styles.propertiesWrapper}>
                    <TextInput 
                        style={[styles.commentInput]}
                        name="input"
                        placeholder={strings("createProjectDescription")}
                        multiline={true}
                        maxLength={1000}
                        onChangeText = {(input) => descriptionInputHandler(input)}
                    />    
                </View>

                <View style={[sharedStyles.wrapperInLine,styles.footerWrapper]}>
                    <Text 
                        style={[styles.footerItems,styles.footerLeftItem]}
                        onPress={closeFunc}
                    > 
                        Anuluj 
                    </Text>
                    <Text 
                        style={[styles.footerItems,styles.footerRighItem]} 
                        onPress={() => submitProject()}
                    > 
                        Utworz
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ModalCreateProject