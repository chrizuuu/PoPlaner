import React from 'react';
import {View,Text} from 'react-native';
import InLineLayout from '../Layouts/InLineLayout';
import {Icon} from 'react-native-elements';
import styleHeader from './style';
import sharedStyles from '../../styles/shared';
import { TouchableOpacity } from 'react-native';

const HeaderBar = ({style,screenName,leftIcon,rightIcon,headerTextSize}) => {
    return (
        <View 
            style = {[
                sharedStyles.margintop20,
                {...style}]} 
        >
        <InLineLayout style={styleHeader.wrapper}>
            {(leftIcon) ? 

                <View
                    style={styleHeader.iconWrapper} 
                >
                    {leftIcon}
                </View>

            : <View style={styleHeader.iconWrapper} />}

                <Text style= {[styleHeader.textStyle,{fontSize:headerTextSize}]}>
                    {screenName}
                </Text>

            {(rightIcon)? 

                <View
                    style={styleHeader.iconWrapper} 
                >
                    {rightIcon}
                </View>

            : <View style={styleHeader.iconWrapper} /> }
        </InLineLayout>
    </View>
    )
}


export default HeaderBar


