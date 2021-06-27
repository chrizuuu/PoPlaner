import React from 'react';
import {View,StatusBar} from 'react-native';
import sharedStyles from '../../styles/shared';

const FlexLayout = ({children,style}) => {
    return (
        <View style={[sharedStyles.wrapperFlex,sharedStyles.container,{...style}]}>
                {children}
        </View>
    )
}

export default FlexLayout