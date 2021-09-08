import React from 'react';
import { StyleSheet,View,Text  } from "react-native";
import InLineLayout from "../Layouts/InLineLayout";
import sharedStyles from "../../styles/shared";

const styles = StyleSheet.create ( {
    box: {
        width:'100%',
    },
    settingsName: {
        fontSize:15,
        fontFamily:"OpenSansSemiBold",
    },
    settingsInfo: {
        fontSize:14,
        fontFamily:"OpenSansSemiBold", 
        opacity:0.7
    },

})

const SettingsBarHeader = ({settingsName,settingsInfo,style}) => {
    return (
        <View style={[{...style}]}>
            <InLineLayout style={styles.box}>
                <Text style={styles.settingsName}>
                    {settingsName}
                </Text>
                <View style={sharedStyles.wrapperInLine}>
                    <Text style={styles.settingsInfo}>
                        {settingsInfo}
                    </Text>
                </View>
            </InLineLayout>
        </View>
    )
}

export default SettingsBarHeader;