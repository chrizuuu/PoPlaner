import React from 'react';
import {TouchableOpacity, Image, StyleSheet,View,Text} from 'react-native';

export default (ItemFlatList = ({
  item,
  style,
  onPress,
  index,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}>
        <View style={styles.buttonS}>
            <Text>{item.toString()}</Text>
        </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create ({
    buttonS: {
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:35,
        backgroundColor:'#1976D2',
    }
})