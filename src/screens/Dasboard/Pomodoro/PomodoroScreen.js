import React from 'react';
import { View,Text, Vibration,Pressable,Button,ScrollView,Dimensions,FlatList,StyleSheet,Switch} from 'react-native';
import Modal from 'react-native-modalbox';

import {strings,setI18Config} from '../../../translations/translations'
import {formatTime} from '../../../components/Helpers/helpers';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import ControlsPomodoroButton from '../../../components/Buttons/ControlsPomodoroButton';
import InLineLayout from '../../../components/Layouts/InLineLayout';
import sharedStyles from '../../../styles/shared';
import HeaderBar from '../../../components/Header/HeaderBar';
import { TouchableOpacity } from 'react-native';
import { Timer } from '../../../components/Timer';
import SettingsBarHeader from '../../../components/settingsBarHeader';
import SettingsSwitchBar from '../../../components/settingsSwitchBar';
import FlatListSlider from '../../../components/FlatListSlider';

const pomodoroTimeValue = [15,20,25,30,35,40,45,50,55,60];
const breaksTimeValue = [2,5,10,15,20,25,30];
var screen = Dimensions.get('window');

const defaultProps = {
    types: [
        {name: 'Pomodoro', time: 1500},
        {name: 'Short Break', time: 300},
        {name: 'Long Break', time: 600},
    ],
    statuses: [
        {name: 'Playing'},
        {name: 'Paused'},
        {name: 'Finished'},
    ],
}

const styles = StyleSheet.create ( {
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    
    timerValue: {
        fontSize:60,   
        fontFamily:'OpenSansBold',
        color:'#282828'
    },

    settingsModal: {
        backgroundColor: "white",
        height:'70%',
        paddingLeft:25,
        paddingRight:25,
        elevation:24,
    },
    box: {
        width:'100%',
    },
    buttonS: {
        alignItems:'center',
        justifyContent:'center',
        width:60,
        height:35,
    }


})

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
          autoBreakStart:false,
          autoLongBreakInterval:4,
          autoPomodoroStart:false,
          isOpen:false,
      }
      this.changeIntervals = this.changeIntervals.bind(this)
    }  

    //
    handlePomodoro = () => {
        this.stopTimer() 
        Vibration.vibrate(100,100,100)
        if(this.state.type === defaultProps.types[0]) {
            this.handleCountInterval()
            if((this.state.countInterval % this.state.autoLongBreakInterval) === 0) this.handleType(defaultProps.types[2]);
            else this.handleType(defaultProps.types[1]);
            this.state.autoBreakStart ? this.startTimer() : this.setState({status:defaultProps.statuses[2].name})
        } else {
            this.handleType(defaultProps.types[0])
            this.state.autoPomodoroStart ? this.startTimer() : this.setState({status:null})

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

    setisOpen = (visible) => {
        this.setState({isOpen: visible})
    }

    changeDefaultProps = (type,value) => {
        defaultProps.types[type].time = value * 60
        this.resetTimer()
    }

    changeIntervals = (value) => {
        this.setState({autoLongBreakInterval:value})        
        this.resetTimer()
    }

    changeAutoPomodoroStart = value => {
        this.setState({autoPomodoroStart:value})
        this.resetTimer()
    }

    changeAutoBreakStart = value => {
        this.setState({autoBreakStart:value})
        this.resetTimer()
    }

    //
    handleType = type => { 
        this.stopTimer();
        this.setState({ 
            type: type, 
            time: type.time,
            playing:false, 
            status: null
        });
    }

    render() {
        let timePercent = ((this.state.type.time - this.state.time)/this.state.type.time) * 100
        let focusTimeValue = defaultProps.types[0].time
        let shortBreakValue = defaultProps.types[1].time
        let longBreakValue = defaultProps.types[2].time

      return (
        <FlexLayout style={{color:'#292929'}}> 
                <HeaderBar 
                    screenName='Pomodoro timer' 
                    leftIcon = 'poll' 
                    leftFunc={() => console.log('Stats')} 
                    rightIcon = 'settings' 
                    rightFunc = {() => this.setisOpen(!this.state.isOpen)} 
                />
                <View style = {[sharedStyles.wrapperFlexSpaceBetween,{alignItems:'center',paddingBottom:50,paddingTop:30}]}>
                    <View style={{height:'20%',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{paddingBottom:5,fontFamily:'OpenSansSemiBold',color:'#B2B2B2'}}>{strings("currentTask")}</Text>
                        <Text style={{fontSize:17,fontFamily:'OpenSansBold',color:'#434343'}}>Pomodoro mobile app design</Text>
                </View>
                    <Timer size = '280' strokeWidth = '10' strokeColor="#1976D2" progress ={timePercent} >
                        <Pressable   onPress={() => this.setisOpen(!this.state.isOpen)}>
                                <Text style={styles.timerValue}>
                                    {formatTime(this.state.time)}
                                </Text>
                        </Pressable>

                        { this.state.type === defaultProps.types[0] 
                        ? 
                            <Text style={{fontFamily:'OpenSansBold',color:'#434343'}}>
                                {this.state.autoLongBreakInterval - (this.state.countInterval % this.state.autoLongBreakInterval)}       
                                {strings("toLongBreak")}
                            </Text>
                            : 
                            <Text style={{fontFamily:'OpenSansBold',color:'#434343'}}>Coffee Time!</Text>
                        }
                    </Timer>
                    <View style={{alignItems:'center',marginBottom:25}}>
                            <Text style={{color:'#434343',fontFamily:'OpenSansReg',fontSize:16}}> 
                                {this.state.type === defaultProps.types[0]
                                ? strings("stayFocus") 
                                : strings("takeBreak") }{this.state.type.time/60} min 
                            </Text>
                    </View>
                
                <ControlsPomodoroButton
                        start = {this.startTimer}
                        pause= {this.pauseTimer}
                        skip = {this.skipTimer}
                        reset= {this.resetTimer}
                        status = {this.state.status}
                    />
            </View>


            
            <Modal 
                coverScreen={true} 
                backButtonClose={true} 
                isOpen={this.state.isOpen} 
                onClosed={this.closeModal} 
                on style={[styles.settingsModal]} 
                position={"bottom"} 
                ref={"modal6"} 
                swipeThreshold={60} 
                swipeArea={40}
            >
                <HeaderBar 
                    style={{backgroudColor:'red'}} 
                    screenName='Pomodoro Settings'
                    style={sharedStyles.marginBottom25} 
                    ightIcon='close' 
                    rightFunc={() => this.setisOpen(!this.state.isOpen)} 
                />
                <View>
                    <View>
                        <SettingsBarHeader 
                            settingsName={strings("focus")}
                            settingsInfo={strings("minutes")}  
                        />
                        <FlatListSlider 
                            data={pomodoroTimeValue}
                            showIndicator={false}
                            onPress={value => this.changeDefaultProps(0,value)}
                            currentValue = {focusTimeValue/60}
                        />
                    </View>

                    <View>
                        <SettingsBarHeader 
                            style={{paddingTop:30}}                        
                            settingsName={strings("shortBreak")}
                            settingsInfo={strings("minutes")}  
                        />

                        <FlatListSlider 
                            data={breaksTimeValue}
                            showIndicator={false}
                            onPress={value => this.changeDefaultProps(1,value)}
                            currentValue = {shortBreakValue/60}

                        />
                    </View>

                    <View>
                        <SettingsBarHeader 
                            style={{paddingTop:30}}
                            settingsName={strings("longBreak")}
                            settingsInfo={strings("minutes")}  
                        />
                        <FlatListSlider 
                            data={breaksTimeValue}
                            showIndicator={false}
                            onPress={value => this.changeDefaultProps(2,value)}
                            currentValue = {longBreakValue/60}
                        />

                    </View>

                    <View>
                        <SettingsBarHeader 
                            style={{paddingTop:30}}
                            settingsName={strings("longBreakIntervals")}
                        />
                        <FlatListSlider 
                            data={[1,2,3,4,5,6,7,8,9,10,11,12]}
                            showIndicator={false} 
                            onPress={item => this.changeIntervals(item)}
                            currentValue = {this.state.autoLongBreakInterval}
                        />
                    </View>
                        
                        <SettingsSwitchBar
                            style={{paddingTop:30}}
                            settingsName={strings("autoStartPomodoro")}
                            switchValue={this.state.autoPomodoroStart}
                            onValueChange={(value)=> this.changeAutoPomodoroStart(value)}
                         />
                        <SettingsSwitchBar
                            style={{paddingTop:30}}                     
                            settingsName={strings("autoStartBreak")}
                            switchValue={this.state.autoBreakStart}
                            onValueChange={(value)=> this.changeAutoBreakStart(value)}
                        />

                    </View>
            </Modal>
        </FlexLayout>
      );
    }
  }
