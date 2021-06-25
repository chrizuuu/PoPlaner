import React from 'react';
import {TouchableOpacity, View,Text} from 'react-native';
import {Icon} from 'react-native-elements';
import styleButton from './style';
import InLineLayout from '../Layouts/InLineLayout'

export default ControlsButton = ({start,pause,skip,status,style}) => {
    return(
<View style = {[{...style}],{alignItems:'center'}}>
{(!status || status == 'Finished' )? 
<TouchableOpacity style={styleButton.buttonControls} onPress={start}>
    <Icon type='material' name='play-arrow' iconStyle = {{color:"white"}} size={42} />
</TouchableOpacity> 
: null}
{(status === 'Playing' || status === 'Paused') ? 
            <InLineLayout >
                <TouchableOpacity style={styleButton.buttonControls} onPress={pause}>
                    <Icon type='material' name={status === 'Playing'? 'pause' : 'play-arrow'} iconStyle = {{color:"white"}} size={42} /> 
                </TouchableOpacity >
                <TouchableOpacity style={styleButton.buttonControls}  onPress={skip}>
                    <Icon name='skip-next' iconStyle = {{color:"white"}} size={42} /> 
                </TouchableOpacity >
            </InLineLayout>
: null}
</View>
    )
}

/*
if 




*/