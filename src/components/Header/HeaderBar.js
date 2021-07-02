import React from 'react';
import {View,Text} from 'react-native';
import InLineLayout from '../Layouts/InLineLayout';
import {Icon} from 'react-native-elements';
import styleHeader from './style';
import sharedStyles from '../../styles/shared';
import { TouchableOpacity } from 'react-native';

const HeaderBar = ({style,screenName,leftIcon,leftFunc,rightIcon,rightFunc}) => {
    return (
        <View style = {[sharedStyles.margintop20,{...style}]} >
        <InLineLayout>
            {(leftIcon && leftFunc) ? 
                <TouchableOpacity style={styleHeader.iconWrapper} onPress={leftFunc}>
                    <Icon type='material' name={leftIcon} />
                </TouchableOpacity>
            : <View style={styleHeader.iconWrapper} />}

                <Text style= {[styleHeader.textStyle]}>{screenName}</Text>

            {(rightIcon && rightFunc )? 
                <TouchableOpacity style={styleHeader.iconWrapper} onPress={rightFunc}>
                    <Icon type='material' name={rightIcon} />
                </TouchableOpacity>
            : <View style={styleHeader.iconWrapper} /> }
        </InLineLayout>
    </View>
    )
}

export default HeaderBar


