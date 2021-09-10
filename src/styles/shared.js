import { StyleSheet} from 'react-native';
import colors from "./colorsLightTheme"

const sharedStyles = StyleSheet.create ({
    //MARGIN TOP
    margintop15: {marginTop:15},
    margintop20: {marginTop:20},
    //MARGIN BOTTOM
    marginBottom5: {marginBottom:5},
    marginBottom10: { marginBottom:10},
    marginBottom25: {marginBottom:25},
    
    marginSide25: {
        marginLeft:25,
        marginRight:25,
    },
    paddingSide25: {
        paddingHorizontal:25,
    },
    paddingSide10: {
        paddingHorizontal:10,
    },

    borderRadius:{ borderRadius:15},
    padding10:{padding:10},

    container: {
        height:'100%',
        width:'100%',
        backgroundColor:colors.secondColor,
    },

    wrapperFlex: {
        flex:1,
    },

    wrapperInLine: {
        flexDirection:'row',
        alignItems:'center',
    },

    errorText: {
        fontFamily:"OpenSansReg",
        fontSize:12,
        color:"#EE5436",
        padding:5,
        marginLeft:15,
    },

    modalContainer: {
        backgroundColor: colors.secondColor,
        height:'100%',
        marginRight:0,
        marginTop:0,
        marginBottom:0,
    }

})

export default sharedStyles;
