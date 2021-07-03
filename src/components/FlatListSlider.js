import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import {setI18Config} from '../translations/translations'

const styles = StyleSheet.create ({
    buttonS: {
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:35,
    },
    box: {
        width:'100%',
        height:60,
        borderRadius:15,
        borderColor:'black',
        borderWidth:1,
        paddingLeft:10,
        paddingRight:10,
    },
})

const FlatListSliderFunc = ({data,showIndicator,onPress}) => {
    return (
        <FlatList 
        horizontal
        showsHorizontalScrollIndicator={showIndicator} 
        data={data}
        keyExtractor={(item,index) => index.toString()} 
        renderItem={({ item }) => 
            <TouchableOpacity
            onPress={() => onPress(item)}>
                <View style={styles.buttonS}>
                    <Text>{item.toString()}</Text>
                </View>
            </TouchableOpacity>} 
        ItemSeparatorComponent = {()=> <View style={{width: 20}} />}
    
        />
    )
}


export default FlatListSliderFunc
