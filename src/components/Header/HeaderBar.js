import React from 'react';
import {View,Text} from 'react-native';
import InLineLayout from '../Layouts/InLineLayout'
import {Icon} from 'react-native-elements';
import styleHeader from './style';
import sharedStyles from '../../styles/shared';
import { TouchableOpacity } from 'react-native';


const HeaderBar = ({screenName,leftIcon,leftFunc,rightIcon,rightFunc}) => {
    return (
        <View style = {[styleHeader.wrapper,sharedStyles.marginSide25,sharedStyles.margintop15]} >
        <InLineLayout>
            {(leftIcon && leftFunc) ? 
            <View style={{backgroundColor: "red", flexGrow: 1,flexShrink: 1,flexBasis: "auto", }} >
                <TouchableOpacity style={{backgroundColor: "red" }} onPress={leftFunc}>
                    <Icon type='material' name={leftIcon} />
                </TouchableOpacity>
            </View>
            : <View style={{ flexGrow: 1,flexShrink: 1,flexBasis: "auto",backgroundColor: "red" }} ></View>}
            <View style={{flexGrow: 3,flexShrink: 1,flexBasis: "auto",backgroundColor:'darkorange'}}>
                <Text style= {[styleHeader.textStyle]}>{screenName}</Text>
            </View> 
            {(rightIcon && rightFunc )? 
            <View style={{flexGrow: 1,flexShrink: 1,flexBasis: "auto",backgroundColor: "red" }}>
                <TouchableOpacity style={{}} onPress={rightFunc}>
                    <Icon type='material' name={rightIcon} />
                </TouchableOpacity>
            </View>
            : <View style={{ flex: 1, backgroundColor: "red" }}></View> }

        </InLineLayout>
    </View>
    )
}

export default HeaderBar
