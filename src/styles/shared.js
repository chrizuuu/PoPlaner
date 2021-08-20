import { StyleSheet} from 'react-native';

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
        paddingLeft:25,
        paddingRight:25,
    },

    borderRadius:{ borderRadius:15},
    padding10:{padding:10},

    container: {
        height:'100%',
        width:'100%',
        backgroundColor:'#fff',
    },

    wrapperFlex: {
        flex:1,
    },

    wrapperInLine: {
        flexDirection:'row',
        alignItems:'center',
    }

})

export default sharedStyles;
