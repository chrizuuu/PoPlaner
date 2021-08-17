import { opacity } from 'jimp';
import React from 'react';
import { Pressable } from 'react-native';
import {View,Button,StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';

export default CheckBox = ({status,onChange,style}) => {


    const styles = StyleSheet.create ( {
        container : {
            borderWidth:2,
            borderRadius:25,
            borderColor:'#53D3AF',
            height:32,
            width:32,
        },

        true: {
            opacity:1.
        },

        false: {
            opacity:0
        },

    })

    let iconStatusChanger = status === true ? styles.true : styles.false

    return (
        
        <Pressable 
            onPress={() => onChange()} 
            style={[
                styles.container,
                {...style} 
            ]} 
        >
            <Icon name="done" style={iconStatusChanger} />
        </Pressable>
    );
}