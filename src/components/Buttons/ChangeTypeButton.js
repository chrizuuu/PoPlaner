import React from 'react';
import {View,Button} from 'react-native';

export default ChangeTypeButton = ({types,functionHandle}) => {
    return (
        <View>
            {types.map(type => <Button key={type.name} onPress = {() => functionHandle(type)} title={type.name}></Button>)}
        </View>
    );
}