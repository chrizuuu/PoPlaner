import React from 'react';
import {Text} from 'react-native';
import sharedStyles from '../../styles/shared';
import styleText from './style';

const SubHeaderTx = (props) => {
    return (
        <Text style={[styleText.subHeader,sharedStyles.marginBottom5]}> {props.children} </Text>
    )
}

export default SubHeaderTx;