import React from 'react';
import {TouchableOpacity,Text} from 'react-native';
import styleButton from './style';
import sharedStyles from '../../styles/shared';

const LinkButton = ({onPress,style,children}) => {
    return (
        <TouchableOpacity onPress={onPress} style = {[{...style}]}>
            <Text style={[styleButton.linkText,{...style}]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
};

export default LinkButton;