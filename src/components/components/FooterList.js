import React from "react"
import {View,StyleSheet} from "react-native"
import sharedStyles from "../../styles/shared"
import { Icon } from "react-native-elements"
const FooterList = ({leftIcon,leftIconOnPress,rightIcon,rightIconOnPress}) => {

    const styles = StyleSheet.create({
        footer: {
            alignItems:"center",
            flexDirection:"row",
            width:"100%",
            justifyContent:"flex-end",
            borderTopColor:"rgb(240,240,240)",
            borderTopWidth:1,
            backgroundColor:"rgb(250,250,250)",
        }
    })

    return (
        <View style={[styles.footer,sharedStyles.padding10]}>
            {leftIcon && leftIconOnPress 
            ?   <Icon 
                    type="ionicon"
                    name={leftIcon}
                    size={28}
                    onPress={leftIconOnPress}
                />
            : <View />
            } 

            {rightIcon && rightIconOnPress 
                ?<Icon 
                    type="ionicon"
                    name={rightIcon}
                    size={28}
                    onPress={rightIconOnPress}
                />  
            : <View />
            }
        </View>  
    )
}

export default FooterList