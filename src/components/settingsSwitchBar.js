import React from 'react';
import { StyleSheet,View,Text,Switch  } from "react-native";
import InLineLayout from "./Layouts/InLineLayout";

const styles = StyleSheet.create ( {
    box: {
        width:'100%',
    },
})

const SettingsSwitchBar = ({settingsName,switchValue,onValueChange,style}) => {
    return (
        <View style={[{...style}]}>
            <InLineLayout style={styles.box}>
                <Text style={{fontFamily:"OpenSansSemiBold"}}>{settingsName}</Text>
                <Switch value={switchValue} onValueChange={onValueChange} />
            </InLineLayout>
        </View>
    )
}

export default SettingsSwitchBar;