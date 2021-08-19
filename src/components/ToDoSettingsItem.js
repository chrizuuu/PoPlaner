import React from 'react';
import {TouchableOpacity, Image, StyleSheet,View,Text, Pressable} from 'react-native';
import FlexLayout from './Layouts/FlexLayout';
import InLineLayout from './Layouts/InLineLayout';
import sharedStyles from '../styles/shared';
import {Icon} from 'react-native-elements';

export default ItemFlatList = ({valueIcon,valueTitle,value,_onPress }) => {

    const styles = StyleSheet.create ({
        inlineContainer:{
            justifyContent:'space-between',
            borderWidth:1,
            borderRadius:25,
            borderColor:'rgba(240,240,240,1)',
            paddingVertical:8,
            paddingHorizontal:15,
        },
        valueTextStyle: {
            fontSize:14,
            fontFamily:'OpenSansSemiBold',
            marginLeft:15,
            marginRight:15
        },
    })

  return (
    <Pressable style={sharedStyles.margintop20} onPress={_onPress}>
            <InLineLayout style={styles.inlineContainer}>
                <InLineLayout style={{justifyContent:'space-between',}}>
                    <Icon size={20} name={valueIcon} />
                    <Text style={[styles.valueTextStyle]}> 
                        {valueTitle}
                    </Text>
                </InLineLayout>
                <Text style={{padding:8}}>
                    {value} 
                </Text>
            </InLineLayout>
    </Pressable>
  );
}

