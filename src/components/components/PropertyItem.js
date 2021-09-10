import React from 'react';
import {TouchableOpacity, Image, StyleSheet,View,Text, Pressable} from 'react-native';
import InLineLayout from '../Layouts/InLineLayout';
import sharedStyles from '../../styles/shared';
import {Icon} from 'react-native-elements';
import colors from "../../styles/colorsLightTheme"

export default PropertyItem = ({valueIcon,valueTitle,valueContainer,onPress,style }) => {

    const styles = StyleSheet.create ({
        inlineContainer:{
            justifyContent:'space-between',
            borderWidth:1,
            borderRadius:5,
            height:50,
            borderColor:colors.thirdColor,
            paddingVertical:5,
            paddingHorizontal:15,
            backgroundColor:colors.primeColor,
        },
        valueTextStyle: {
            fontSize:14,
            fontFamily:'OpenSansSemiBold',
            marginLeft:15,
            marginRight:15
        },
        inlineStyle: {
            justifyContent:'flex-start',
            flex:2,
        }
    })


  return (
    <Pressable style={[sharedStyles.margintop20,{...style}]} onPress={onPress}>
            <InLineLayout style={styles.inlineContainer}>
                <InLineLayout style={styles.inlineStyle}>
                    <Icon size={20} name={valueIcon} />
                    <Text style={[styles.valueTextStyle]}> 
                        {valueTitle}
                    </Text>
                </InLineLayout>
                <View style={{flex:3}}>
                    {valueContainer} 
                </View>
            </InLineLayout>
    </Pressable>
  );
}

