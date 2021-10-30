import React from 'react';
import { View,Text, Vibration,Pressable,TouchableOpacity,Dimensions,FlatList,StyleSheet, AppRegistry} from 'react-native';
import Modal from 'react-native-modal';
import {strings} from '../../../translations/translations'
import {formatTime} from '../../../components/Helpers/helpers';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import ControlsPomodoroButton from '../../../components/Buttons/ControlsPomodoroButton';
import sharedStyles from '../../../styles/shared';
import HeaderBar from '../../../components/Header/HeaderBar';
import { Timer } from '../../../components/components/Timer';
import SettingsBarHeader from '../../../components/components/settingsBarHeader';
import SettingsSwitchBar from '../../../components/components/settingsSwitchBar';
import FlatListSlider from '../../../components/components/FlatListSlider';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import colors from "../../../styles/colorsLightTheme"
import NotifService from "../../../notification/NotificationConfig"
import BackgroundTimer from "react-native-background-timer"
import { pomodoroNotif} from '../../../headless/notification';
import { differenceInSeconds } from "date-fns";


const notif = new NotifService()
const pomodoroTimeValue = [0.2,10,15,20,25,30,35,40,45,50,55,60,70,80,90];
const breaksTimeValue = [0.2,2,5,10,15,20,25,30];

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
    wrapper:{
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingTop:50,
        height:'100%',
        paddingBottom:80,
        backgroundColor:colors.primeColor
    },

    boldText:{
        fontFamily:'OpenSansBold',
        color:colors.textColor,
    },

    timerValue: {
        fontSize:60,   
        fontFamily:'OpenSansBold',
        color:colors.textColor,
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

export default class PomodoroScreen extends React.PureComponent{
    constructor(props) {
      super(props);
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
          settingsIsOpen:false,
      }
    }  
    componentDidMount() {
        notif.cancelSpecificNotif(9998)
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    style={{marginRight:11}} 
                    onPress={() => this.setIsOpen(!this.state.settingsIsOpen)}
                >
                    <Icon 
                        type="ionicon"
                        name="information-circle-outline"
                        
                    />      
                </TouchableOpacity>    
                ),
         });
    }

    componentWillUnmount() {
        this.props.navigation.setOptions({
            headerRight: () => null
         });
        this.stopTimer()
        if (this.state.playing === true) 
            pomodoroNotif({
                id:9998,
                title:"Pomodoro Timer",
                message:"Timer przestał dzialac",
            })
    }    
    
    handlePomodoro = () => {
        this.stopTimer()
        BackgroundTimer.stopBackgroundTimer()
        notif.cancelSpecificNotif(9999) 
        Vibration.vibrate(100,100,100)
        if(this.state.type === defaultProps.types[0]) {
            this.handleCountInterval()
            if((this.state.countInterval % this.state.autoLongBreakInterval) === 0) {
                this.handleType(defaultProps.types[2]);
                pomodoroNotif({
                    id:9999,
                    title:strings("timeUp"),
                    message:strings("takeALongBreak"),
                })
            }
            else{
                this.handleType(defaultProps.types[1]);
                pomodoroNotif({
                    id:9999,
                    title:strings("timeUp"),
                    message:strings("takeAShortBreak")
                })
            }
            this.state.autoBreakStart ? this.startTimer() : this.setState({status:defaultProps.statuses[2].name})
        } else {
            this.handleType(defaultProps.types[0])
            pomodoroNotif({
                id:9999,
                title:strings("endBreak"),
                message:strings("backToWork"),
            })
            this.state.autoPomodoroStart ? this.startTimer() : this.setState({status:null})
        }
    }

    handleCountInterval = () =>{
        this.setState({ 
            countInterval: ++this.state.countInterval
        })    
    }

    timer = (startTime) => {
        this.state.time < 1 ? this.handlePomodoro() : this.setState(prevState => ({ time: this.state.type.time - differenceInSeconds(new Date(), Date.parse(startTime))}))
    }

    startTimer = () => { 
        const startTime = new Date()
        this.setState ({
            status: defaultProps.statuses[0].name,
            playing: true,
            interval: BackgroundTimer.setInterval(() => { this.timer(startTime)},1000)
        })
    }

    stopTimer = () => {
        BackgroundTimer.clearInterval(this.state.interval)
        this.setState({
            interval:null,
        })
    };

    
    resetTimer = () => {
        this.stopTimer()
        this.setState({
            time: this.state.type.time,
            playing:false,
            status:null,
            countInterval:0,
        })

    }

    skipTimer = () => {
        this.handlePomodoro()
    }
 
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

    setIsOpen = (visible) => {
        this.setState({
            settingsIsOpen: visible
        })
    }

    changeDefaultProps = (type,value) => {
        defaultProps.types[type].time = value * 60
        this.resetTimer()
    }

    changeIntervals = (value) => {
        this.setState({
            autoLongBreakInterval:value
        })        
        this.resetTimer()
    }

    changeAutoPomodoroStart = () => {
        this.setState({
            autoPomodoroStart:!this.state.autoPomodoroStart
        })
        this.resetTimer()
    }

    changeAutoBreakStart = () => {
        this.setState({
            autoBreakStart:!this.state.autoBreakStart
        })
        this.resetTimer()
    }

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

      return (
        <FlexLayout style={{color:'#282828'}}> 
                <View style = {styles.wrapper}>

                <Timer 
                    size = '280' 
                    strokeWidth = '10' 
                    strokeColor="#53D3AF" 
                    progress ={timePercent} 
                    >
                    <Pressable  onPress={() => this.setIsOpen(!this.state.settingsIsOpen)}>
                            <Text style={styles.timerValue}>
                                {formatTime(this.state.time)}
                            </Text>
                    </Pressable>

                    { this.state.type === defaultProps.types[0] 
                    ? 
                        <Text style={styles.boldText}>
                            {this.state.autoLongBreakInterval - (this.state.countInterval % this.state.autoLongBreakInterval)}       
                            {strings("toLongBreak")}
                        </Text>
                        : 
                        <Text style={styles.boldText}>
                            Coffee Time!
                        </Text>
                     }
                </Timer>
                <View style={{alignItems:'center'}}>
                    <View style={{marginBottom:20}}>
                            <Text style={{
                                color:colors.textColor,
                                fontFamily:'OpenSansReg',
                                fontSize:16,
                            }}> 
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
            </View>
                
            <Modal 
                animationIn="slideInRight"
                animationOut="slideOutRight"
                animationInTiming={600}
                isVisible={this.state.settingsIsOpen} 
                swipeDirection='right'
                onSwipeComplete={() => this.setIsOpen(!this.state.settingsIsOpen)}
                onBackdropPress={() => this.setIsOpen(!this.state.settingsIsOpen)} 
                style={sharedStyles.modalContainer}
            >
                <FlexLayout>
                    <HeaderBar 
                        screenName='Pomodoro Settings'
                        headerTextSize={18}
                        style={sharedStyles.marginSide25}
                        rightIcon = {
                            <>
                                <Pressable onPress={() => this.setIsOpen(!this.state.settingsIsOpen)} >
                                    <Icon name='close' />
                                </Pressable>
                            </>
                        }
                    />
                    <View style={[sharedStyles.marginSide25,{marginTop:30}]}>   
                        <View>
                            <SettingsBarHeader 
                                settingsName={strings("focus")}
                                settingsValue={(defaultProps.types[0].time)/60}  
                            />
                            <FlatListSlider 
                                data={pomodoroTimeValue}
                                currentValue={defaultProps.types[0].time/60}
                                onPress={value => this.changeDefaultProps(0,value)}
                                showIndicator={false} 
                            />
                        </View>
                        <View>
                            <SettingsBarHeader 
                                style={{marginTop:30}}                        
                                settingsName={strings("shortBreak")}
                                settingsValue={(defaultProps.types[1].time)/60} 
                            />

                            <FlatListSlider 
                                data={breaksTimeValue}
                                currentValue={defaultProps.types[1].time/60}
                                onPress={value => this.changeDefaultProps(1,value)}
                                showIndicator={false} 
                            />
                        </View>
                        <View>
                            <SettingsBarHeader 
                                style={{marginTop:30}}
                                settingsName={strings("longBreak")}
                                settingsValue={(defaultProps.types[2].time)/60} 
                            />
                            <FlatListSlider 
                                data={breaksTimeValue}
                                currentValue={defaultProps.types[2].time/60}
                                onPress={value => this.changeDefaultProps(2,value)}
                                showIndicator={false} 
                            />
                        </View>
                        <View>
                            <SettingsBarHeader 
                                style={{marginTop:30}}
                                settingsName={strings("longBreakIntervals")}
                                settingsValue={this.state.autoLongBreakInterval}
                            />
                            <FlatListSlider 
                                data={[1,2,3,4,5,6,7,8,9,10,11,12]}
                                currentValue = {this.state.autoLongBreakInterval}
                                onPress={this.changeIntervals}
                                showIndicator={false} 
                            />
                        </View>
                            <SettingsSwitchBar
                                style={{marginTop:30}}
                                settingsName={strings("autoStartPomodoro")}
                                switchValue={this.state.autoPomodoroStart}
                                onValueChange={()=> this.changeAutoPomodoroStart()}
                            />
                            <SettingsSwitchBar
                            
                                style={{marginTop:30}}                     
                                settingsName={strings("autoStartBreak")}
                                switchValue={this.state.autoBreakStart}
                                onValueChange={()=> this.changeAutoBreakStart()}
                            />
                        </View>
                    </FlexLayout>
                </Modal>
        </FlexLayout>
      );
    }
  }
