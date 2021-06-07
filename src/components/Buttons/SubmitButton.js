import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import styleButton from './style';
import sharedStyles from '../../styles/shared';

const SubmitButton = ({onPress,style,children}) => {
    return (
        <TouchableOpacity style = {[styleButton.button,sharedStyles.borderRadius,{...style}]}>
            <Text style={[styleButton.buttonText, {...style}]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
};

export default SubmitButton