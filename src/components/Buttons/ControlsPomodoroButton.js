import React from 'react';
import {TouchableOpacity, View,StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import styleButton from './style';
import InLineLayout from '../Layouts/InLineLayout'

export default ControlsButton = ({start,pause,reset,skip,status,style}) => {

    const styles = StyleSheet.create({
        normalBtn: {
            width:72,
            height:72
        },
        smallBtn: {
            borderColor:'#EFF1F4', 
            borderWidth:1,
            height:54,
            width:54
        }
    })

    const backgroundColorChanger = status === 'Playing' ? '#EE5436' : '#53D3AF'
    return(
        <View 
            style = {[
            {...style},
            {alignItems:'center'
            }]}
        >
            {(!status || status == 'Finished' )? 
            <TouchableOpacity 
                style={[
                    styleButton.buttonControls,styles.normalBtn,
                    {backgroundColor:'#53D3AF',}
                ]} 
                onPress={start}
            >
                <Icon 
                    type='material' 
                    name='play-arrow' 
                    iconStyle = {{color:"white"}} 
                    size={48} 
                />

            </TouchableOpacity> 
        : null}
        {(status === 'Playing' || status === 'Paused') ? 
                    <InLineLayout style={{width:'70%'}}>
                        <TouchableOpacity 
                            style={[styleButton.buttonControls,styles.smallBtn]} 
                            onPress={reset}
                        >
                            <Icon 
                                type='material' 
                                name='replay'
                                iconStyle = {{color:"#C3C5CA"}} 
                                size={36} 
                            /> 
                        </TouchableOpacity >

                        {
                            <TouchableOpacity
                                style={[
                                    styleButton.buttonControls,styles.normalBtn,
                                    {backgroundColor:backgroundColorChanger,}
                                ]} 
                                onPress={pause}
                            >
                                <Icon
                                    type='material' 
                                    name={status === 'Playing'? 'pause' : 'play-arrow'} 
                                    iconStyle = {{color:"white"}}
                                    size={48} 
                                /> 
                            </TouchableOpacity >
                        }
                        <TouchableOpacity 
                            style={[styleButton.buttonControls,styles.smallBtn]} 
                            onPress={skip}
                        >
                            <Icon 
                                name='skip-next' 
                                iconStyle = {{color:"#C3C5CA"}} 
                                size={36} 
                            /> 
                        </TouchableOpacity >
                    </InLineLayout>
        : null}
        </View>
    )
}

/*
if 




*/