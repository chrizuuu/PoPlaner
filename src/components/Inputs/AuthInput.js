import React from 'react';
import {TextInput,Text} from 'react-native';
import inputStyle from './styles'
import sharedStyles from '../../styles/shared';

export const AuthInputLabel = (props) => {
    return (   
    <Text style = {[inputStyle.authInputLabel,{...props.style}]}>
        {props.children}
    </Text>)
};


export const AuthInput = ({style,secureTextEntry,value}) => {
    
    return (
        <TextInput 
        style={[inputStyle.authInput,sharedStyles.borderRadius,sharedStyles.padding, {...style}]}
        value = {value}
        secureTextEntry = {secureTextEntry}
        required>
        </TextInput>
    )
};
