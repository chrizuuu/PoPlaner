import React from 'react';
import {View,StatusBar} from 'react-native';
import sharedStyles from '../../styles/shared';

const FlexLayout = ({children,style}) => {
    return (
        <View style={[sharedStyles.container,{...style}]}>
            <View style={[style]}>
                {children}
            </View>
        </View>
    )
}

export default FlexLayout