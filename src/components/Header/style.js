import { StyleSheet} from 'react-native';

const styleHeader = StyleSheet.create ({
    wrapper: {
        justifyContent:'space-between',
        height:60,
    },

    container: {
        alignContent:"center",
        alignItems:"center",
        height:60,
    },

    textStyle : {
        fontSize:20,
        fontFamily:'OpenSansBold'
    },
    iconWrapper: {
        width:26,
        height:26,
    },
})

export default styleHeader;