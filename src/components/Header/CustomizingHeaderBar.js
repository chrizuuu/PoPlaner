import React from 'react';
import {View,Text} from 'react-native';
import InLineLayout from '../Layouts/InLineLayout';
import {Icon} from 'react-native-elements';
import styleHeader from './style';
import sharedStyles from '../../styles/shared';
import { TouchableOpacity } from 'react-native';

const CustomizingHeaderBar = ({style,leftSide,centerSide,rightSide}) => {
    return (
        <View style = {[styleHeader.container,{...style}]} >
            <InLineLayout style={styleHeader.wrapper}>
                {(leftSide) ? 
                    <View
                        style={styleHeader.iconWrapper} 
                    >
                        {leftSide}
                    </View>

                : <View style={styleHeader.iconWrapper} />}

                        {centerSide}

                {(rightSide)? 

                    <View
                        style={styleHeader.iconWrapper} 
                    >
                        {rightSide}
                    </View>

                : <View style={styleHeader.iconWrapper} /> }
            </InLineLayout>
        </View>
    )
}


export default CustomizingHeaderBar


