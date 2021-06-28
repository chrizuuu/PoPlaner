import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import {setI18Config} from '../translations/translations'
import ItemFlatList from './ItemFlatList';
import InLineLayout from './Layouts/InLineLayout';
import sharedStyles from '../styles/shared';
import { Icon } from 'react-native-elements';

export default class FlatListSlider extends React.Component {
    constructor(props) {
        super(props)
        setI18Config()
        this.state = {
            data: [],
            showIndicator:false,
        }
    }
    render() {
        return (
            <FlatList 
            horizontal
            showsHorizontalScrollIndicator={this.props.showIndicator} 
            data={this.props.data}
            keyExtractor={(item,index) => index.toString()} 
            renderItem={({ item }) => 
                <TouchableOpacity
                onPress={() => this.props.onPress(item)}>
                    <View style={styles.buttonS}>
                        <Text>{item.toString()}</Text>
                    </View>
                </TouchableOpacity>} 
            ItemSeparatorComponent = {()=> <View style={{width: 20}} />}
        
            />
        )
    }
}

const styles = StyleSheet.create ({
    buttonS: {
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:35,
        backgroundColor:'#1976D2',
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