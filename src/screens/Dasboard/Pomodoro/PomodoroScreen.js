import React from 'react';
import { View,Text, Vibration,Pressable,Button,ScrollView,Dimensions} from 'react-native';
import Modal from 'react-native-modalbox';

import {strings,setI18Config} from '../../../translations/translations'
import {formatTime} from '../../../components/Helpers/helpers';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import ControlsPomodoroButton from '../../../components/Buttons/ControlsPomodoroButton';
import ChangeTypeButton from '../../../components/Buttons/ChangeTypeButton';
import linkButton from '../../../components/Buttons/LinkButton';
import styles from './style';
import InLineLayout from '../../../components/Layouts/InLineLayout';
import sharedStyles from '../../../styles/shared';
import HeaderBar from '../../../components/Header/HeaderBar';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Touchable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native';

const pomodoroTimeValue = [15,20,25,30,35,40,45,50,55,60];
const breaksTimeValue = [2,5,10,15,20,25,30];
var screen = Dimensions.get('window');

const defaultProps = {
    types: [
        {name: 'Pomodoro', time: 600},
        {name: 'Short Break', time: 1},
        {name: 'Long Break', time: 2},
    ],
    statuses: [
        {name: 'Playing'},
        {name: 'Paused'},
        {name: 'Finished'},
    ],
}
export default class PomodoroScreen extends React.Component {
    constructor(props) {
      super(props);
      setI18Config();
      this.state = {
          type: defaultProps.types[0],
          time: defaultProps.types[0].time,
          playing: false,
          status: null, 
          interval:null,
          countInterval:0,
          autoBreak:false,
          autoPomodoro:false,
          autoLongBreakInterval:4,
          isOpen:false,
      }
    }  

    //
    handlePomodoro = () => {
        this.stopTimer() 
        Vibration.vibrate(100,100,100)
        if(this.state.type === defaultProps.types[0]) {
            this.handleCountInterval()
            if((this.state.countInterval % this.state.autoLongBreakInterval) === 0) this.handleType(defaultProps.types[2]);
            else this.handleType(defaultProps.types[1]);
            this.state.autoBreak ? this.startTimer() : this.setState({status:defaultProps.statuses[2].name})
        } else {
            this.handleType(defaultProps.types[0])
            this.state.autoPomodoro ? this.startTimer() : this.setState({status:null})

        }
    }

    //
    handleCountInterval = () =>{
        this.setState(({ countInterval: ++this.state.countInterval}))    
    }

    //DONE
    timer = () => {
        this.state.time < 1 ? this.handlePomodoro() : this.setState(prevState => ({ time: --prevState.time}))
    }

    //DONE
    startTimer = () => { 
        this.setState ({
            status: defaultProps.statuses[0].name,
            playing: true,
            interval: setInterval(this.timer,1000),
        })
    }

    stopTimer = () => {
        clearInterval(this.state.interval)
        this.setState({
            interval:null,
        })
    };

    //
    resetTimer = () => {
        this.stopTimer()
        this.setState({
            time: this.state.type.time,
            playing:false,
            status:null,
            countInterval:0,
        })

    }

    //Do poprawy wydajnośc tego rozwiazania
    skipTimer = () => {
        this.handlePomodoro()
    }
 
    //DONE
    pauseTimer = () => { 
        if (this.state.playing){
            this.stopTimer() 
            this.setState({
                status:defaultProps.statuses[1].name,
                playing: false,
            })
        }else {
            this.startTimer()
        }
    }

    progressValue = () => {
        const current = this.state.currentTime
        const totalTime = this.state.type.time
        return ((totalTime - current) / totalTime) * 100;
    }

    setisOpen = (visible) => {
        this.setState({isOpen: visible})
    }

    handlePomodoroTime = (value) => {
        defaultProps.types[0].time = value * 60
        this.resetTimer()
    }

    changeDefaultProps = (type,value) => {
        defaultProps.types[type].time = value * 60
        this.resetTimer()
    }

    //
    handleType = type => { 
        this.stopTimer();
        this.setState({ type: type, time: type.time, playing:false, status: null});
    }

    render() {
      return (
        <FlexLayout style={{paddingBottom:25}}>
            <HeaderBar screenName='Pomodoro Timer' rightIcon = 'settings' rightFunc = {() => this.setisOpen(!this.state.isOpen)} />
            <View>
                <Text>Dodaj zadanie</Text>
            </View>
            <View style = {sharedStyles.wrapperFlexCenter}>
                <View style={styles.timer}>
                    <Text>Pomodoro Timer!</Text>
                    <Text>{this.state.type.name}</Text>

                    <Pressable
                    onPress={() => this.setisOpen(!this.state.isOpen)}>
                        <Text style={styles.timerValue}>{formatTime(this.state.time)} </Text>
                    </Pressable>

                    <Text>{strings("timerIntervalRound")}{ this.state.type === defaultProps.types[0] ? this.state.countInterval + 1 : this.state.countInterval}</Text>
                </View>
            </View>
            <ControlsPomodoroButton
                start = {this.startTimer}
                pause= {this.pauseTimer}
                skip = {this.skipTimer}
                status = {this.state.status}>    
            </ControlsPomodoroButton>
            
            <Modal coverScreen={true} backButtonClose={true} isOpen={this.state.isOpen} onClosed={this.closeModal} on style={[styles.settingsModal]} position={"bottom"} ref={"modal6"} swipeThreshold={60} swipeArea={40}>
                <HeaderBar screenName='Pomodoro Settings' style={sharedStyles.marginBottom25} rightIcon='close' rightFunc={() => this.setisOpen(!this.state.isOpen)} />
                <ScrollView>
                    <TouchableOpacity style={{paddingTop:15}}>
                            <InLineLayout style={styles.box}>
                                 <Text>Focus</Text>
                                <View style={sharedStyles.wrapperInLine}>
                                    <Text>{(defaultProps.types[0].time)/60} min</Text>
                                    <Icon type='material' name='arrow-drop-down' />
    
                                </View>
                            </InLineLayout>
                        </TouchableOpacity>

                      {pomodoroTimeValue.map((value) =>
                        <Button key={value} onPress={() => this.changeDefaultProps(0,value)}  title={value.toString()} />
                      )}

                        <TouchableOpacity style={{paddingTop:15}}>  
                            <InLineLayout style={styles.box}>
                                 <Text>Short Break</Text>
                                <View style={sharedStyles.wrapperInLine}>
                                    <Text>{(defaultProps.types[1].time)/60} min</Text>
                                    <Icon type='material' name='arrow-drop-down' />
                                </View>
                            </InLineLayout>
                        </TouchableOpacity>

                        {breaksTimeValue.map((value) =>
                        <Button key={value} onPress={() => this.changeDefaultProps(1,value)}  title={value.toString()} />
                      )}

                        <TouchableOpacity style={{paddingTop:15}}>
                            <InLineLayout style={styles.box}>
                                 <Text>Long Break</Text>
                                <View style={sharedStyles.wrapperInLine}>
                                    <Text>{(defaultProps.types[2].time)/60} min</Text>
                                    <Icon type='material' name='arrow-drop-down' />
                                </View>
                            </InLineLayout>
                        </TouchableOpacity>

                        {breaksTimeValue.map((value) =>
                        <Button key={value} onPress={() => this.changeDefaultProps(2,value)}  title={value.toString()} />
                      )}

                        <TouchableOpacity style={{paddingTop:15}}>
                            <InLineLayout style={styles.box}>
                                 <Text>Long Break Intervals</Text>
                                <View style={sharedStyles.wrapperInLine}>
                                    <Text>{this.state.autoLongBreakInterval}</Text>
                                    <Icon type='material' name='arrow-drop-down' />
                                </View>
                            </InLineLayout>
                        </TouchableOpacity>

                        {[1,2,3,4,5,6,7,8,9,10].map((value) =>
                        <Button key={value} onPress={() => this.setState({autoLongBreakInterval:value})}  title={value.toString()} />
                      )}

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

                        <InLineLayout style={{paddingTop:15,paddingBottom:20,}}>
                            <TouchableOpacity style = {{borderRadius:50,borderColor:'black',height:60, width:60, borderWidth:1, justifyContent:'center'}}>
                                <Icon type='material' name='notifications'/>
                            </TouchableOpacity>
                            <TouchableOpacity style = {{borderRadius:50,borderColor:'black',height:60, width:60, borderWidth:1, justifyContent:'center'}}>
                                <Icon type='material' name='cloud'/>
                            </TouchableOpacity>
                            <TouchableOpacity style = {{borderRadius:50,borderColor:'black',height:60, width:60, borderWidth:1, justifyContent:'center'}}>
                                <Icon type='material' name='train'/>
                            </TouchableOpacity>
                        </InLineLayout>
                    </ScrollView>
            </Modal>
        </FlexLayout>
      );
    }
  }
