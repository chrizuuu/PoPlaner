import { StyleSheet, } from 'react-native';

export default styles = StyleSheet.create ( {
    timer: {
        backgroundColor:'red',
        justifyContent:'center',
        alignContent:'center',
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
        alignItems: "center",
        marginTop:80,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
        inputSettings: {
            width:'90%',
            borderRadius:25,
            borderColor:'black',
            borderWidth:1,
        },

})