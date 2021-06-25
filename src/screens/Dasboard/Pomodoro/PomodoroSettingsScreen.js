import React from 'react';
import { TouchableOpacity,Text} from 'react-native';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import {strings,setI18Config} from '../../../translations/translations'
import HeaderBar from '../../../components/Header/HeaderBar';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal'

export default class PomodoroSettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        setI18Config();

    }
    render() {
        return (
            <ScrollView contentContainerStyle={[sharedStyles.wrapperFlexStart,styles.settingsModal]}>
            <HeaderBar screenName='Pomodoro Settings' style={sharedStyles.marginBottom25} rightIcon='close' rightFunc={() => this.setSettingsVisible(!this.state.settingsVisible)} />
            <View style={sharedStyles.marginSide25}>
            
                <TouchableOpacity style={{paddingTop:15}}>
                    <InLineLayout style={styles.box}>
                         <Text>Focus</Text>
                        <View style={sharedStyles.wrapperInLine}>
                            <Text>{(defaultProps.types[0].time)/60} min</Text>
                            <Icon type='material' name='arrow-drop-down' />
                        </View>
                    </InLineLayout>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingTop:15}}>  
                    <InLineLayout style={styles.box}>
                         <Text>Short Break</Text>
                        <View style={sharedStyles.wrapperInLine}>
                            <Text>{(defaultProps.types[1].time)/60} min</Text>
                            <Icon type='material' name='arrow-drop-down' />
                        </View>
                    </InLineLayout>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingTop:15}}>
                    <InLineLayout style={styles.box}>
                         <Text>Long Break</Text>
                        <View style={sharedStyles.wrapperInLine}>
                            <Text>{(defaultProps.types[2].time)/60} min</Text>
                            <Icon type='material' name='arrow-drop-down' />
                        </View>
                    </InLineLayout>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingTop:15}}>
                    <InLineLayout style={styles.box}>
                         <Text>Long Break Intervals</Text>
                        <View style={sharedStyles.wrapperInLine}>
                            <Text>{this.state.autoLongBreakInterval}</Text>
                            <Icon type='material' name='arrow-drop-down' />
                        </View>
                    </InLineLayout>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingTop:15}}>
                    <InLineLayout style={styles.box}>
                         <Text>Auto Start Breaks?</Text>
                         <Text>{this.state.autoBreak.toString()}</Text>
                    </InLineLayout>
                </TouchableOpacity>

                <TouchableOpacity style={{paddingTop:15}}>
                    <InLineLayout style={styles.box}>
                         <Text>Auto Start Pomodoro?</Text>
                            <Text>{this.state.autoPomodoro.toString()}</Text>
                    </InLineLayout>
                </TouchableOpacity>

                <InLineLayout style={{paddingTop:15}}>
                    <TouchableOpacity style = {{borderRadius:50,borderColor:'black',height:60, width:60, borderWidth:1, justifyContent:'center'}}>
                        <Icon type='material' name='notifications'/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{borderRadius:50,borderColor:'black',height:60, width:60, borderWidth:1, justifyContent:'center'}}>
                        <Icon type='material' name='cloud'/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{borderRadius:50,borderColor:'black',height:60, width:60, borderWidth:1, justifyContent:'center'}}>
                        <Icon name='rain'/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{borderRadius:50,borderColor:'black',height:60, width:60, borderWidth:1, justifyContent:'center'}}>
                        <Icon type='material' name='train'/>
                    </TouchableOpacity>
                </InLineLayout>
            </View>
        </ScrollView>
        )
    }
}