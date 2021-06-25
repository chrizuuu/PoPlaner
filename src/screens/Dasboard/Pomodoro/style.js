import { StyleSheet, } from 'react-native';

export default styles = StyleSheet.create ( {
    timer: {
        justifyContent:'center',
        alignItems:'center',
        width:280,
        height:280,
        borderWidth:1,
        borderRadius:280/2,
        borderColor:'black',
    },
    timerValue: {
        fontSize:32,
        fontWeight:"700",
    },

    settingsModal: {
        backgroundColor: "white",
        height:'80%',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        elevation:24,
    },
    box: {
        width:200,
        height:60,
        borderRadius:15,
        borderColor:'black',
        borderWidth:1,
        paddingLeft:10,
        paddingRight:10,
    },


})