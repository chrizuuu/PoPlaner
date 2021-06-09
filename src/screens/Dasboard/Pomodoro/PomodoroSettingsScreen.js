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
            <Modal 
            animationType="slide"
            transparent={true}
            visible={this.state.settingsVisible}
            onRequestClose={() => {this.setSettingsVisible(!this.state.settingsVisible);}}
            onBackdropPress={() =>{this.setSettingsVisible(!this.state.settingsVisible)}}>
        
                <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
                    <View style={[sharedStyles.wrapperFlexStart,styles.settingsModal]}>
                        <HeaderBar screenName='Pomodoro Settings' style={sharedStyles.marginBottom25} rightIcon='close' rightFunc={() => this.setSettingsVisible(!this.state.settingsVisible)} />
                        <View>
                            <View style={styles.inputSettings}>
                                <InLineLayout>
                                    <Text>Time Pomodoro</Text>      
                                    <TextInput
                                    style={styles.input}
                                    value={this.state.time}
                                    keyboardType="numeric"
                                    onChange={(e)=> this.setState({time: e.target.value})}
                                    />
                                </InLineLayout>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>        )
    }
}