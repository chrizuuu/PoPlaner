import React from 'react';
import { StyleSheet,View,Text,Switch  } from "react-native";
import InLineLayout from "../Layouts/InLineLayout";
import CheckBox from "../Buttons/CheckBox"

const styles = StyleSheet.create ( {
    box: {
        width:'100%',
        justifyContent:"space-between"
    },
})

const SettingsSwitchBar = ({settingsName,switchValue,onValueChange,style}) => {
    return (
        <View style={[{...style}]}>
            <InLineLayout style={styles.box}>
                <Text style={{fontFamily:"OpenSansSemiBold"}}>{settingsName}</Text>
                <CheckBox status={switchValue} onChange={onValueChange}  />
            </InLineLayout>
        </View>
    )
}

export default SettingsSwitchBar;