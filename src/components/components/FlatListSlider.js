import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import colors from "../../styles/colorsLightTheme"

const styles = StyleSheet.create ({
    button: {
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:35,
    },
    buttonCurrent: {
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:35,
        backgroundColor:'#1976D2',
        borderRadius:20,
        color:'white',
    },
    text: {
        color:colors.textColor, 
        fontFamily:'OpenSansSemiBold'
    },
    currentValueText : {
        color:'white',
        fontFamily:'OpenSansSemiBold'
    },
    box: {
        width:'100%',
        height:60,
        borderRadius:15,
        borderColor:colors.thirdColor,
        borderWidth:1,
        paddingLeft:10,
        paddingRight:10,
    },

})
const FlatListSliderFunc = ({data,showIndicator,onPress,currentValue,style}) => {
    return (
        <View style={[{...style}]} >
            <FlatList 
            horizontal
            showsHorizontalScrollIndicator={showIndicator} 
            data={data}
            keyExtractor={(item,index) => index.toString()} 
            renderItem={({ item }) => 
                <TouchableOpacity
                    onPress={() => onPress(item)}>
                    {
                        item === currentValue
                        ? 
                            <View style={styles.buttonCurrent}>
                                <Text style={styles.currentValueText}>
                                    {item.toString()}
                                </Text>
                            </View>
                        :     
                            <View style={styles.button}>
                                <Text style={styles.text}>
                                    {item.toString()}
                                </Text>
                            </View>
                    }
                </TouchableOpacity>} 
            ItemSeparatorComponent = {()=> <View style={{width: 20}} />}
            />
        </View>
    )
}


export default FlatListSliderFunc
