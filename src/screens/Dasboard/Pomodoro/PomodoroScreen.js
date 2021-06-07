import React from 'react';
import { View,Text, Vibration,Modal,Pressable} from 'react-native';
import {strings,setI18Config} from '../../../translations/translations'
import {formatTime} from '../../../components/Helpers/helpers';
import FlexLayout from '../../../components/Layouts/FlexLayout';
import ControlsButton from '../../../components/Buttons/ControlsButton';
import ChangeTypeButton from '../../../components/Buttons/ChangeTypeButton';
import styles from './style';
import InLineLayout from '../../../components/Layouts/InLineLayout';
import sharedStyles from '../../../styles/shared';
import HeaderBar from '../../../components/Header/HeaderBar';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

export default class PomodoroScreen extends React.Component {
    constructor(props) {
      super(props);
      setI18Config();
      this.state = {
          type: props.types[0],
          time: props.types[0].time,
          playing: false,
          status: null, 
          interval:null,
          countInterval:0,
          autoBreak:false,
          autoPomodoro:false,
          autoLongBreakInterval:4,
          settingsVisible:false,
      }
    }  


    static defaultProps = {
        types: [
            {name: 'Pomodoro', time: 5},
            {name: 'Short Break', time: 3},
            {name: 'Long Break', time: 10},
        ],
        statuses: [
            {name: 'Playing'},
            {name: 'Paused'},
            {name: 'Finished'},
        ]
    }

    setSettingsVisible = (visible) => {
        this.setState({settingsVisible: visible})
    }

    //
    handleType = type => { 
        this.stopTimer();
        this.setState({ type: type, time: type.time, playing:false, status: null});
    }

    //
    handlePomodoro = () => {
        this.stopTimer() 
        Vibration.vibrate(100,100,100)
        if(this.state.type === this.props.types[0]) {
            this.handleCountInterval()
            if((this.state.countInterval % this.state.autoLongBreakInterval) === 0) this.handleType(this.props.types[2]);
            else this.handleType(this.props.types[1]);
            this.state.autoBreak ? this.startTimer() : this.setState({status:this.props.statuses[2].name})
        } else {
            this.handleType(this.props.types[0])
            this.state.autoPomodoro ? this.startTimer() : this.setState({status:null})
        }
    }

    //
    handleCountInterval = () =>{
        this.setState(prevState => ({ countInterval: prevState.countInterval + 1}))    
    }

    //
    timer = () => {
        this.state.time < 1 ? this.handlePomodoro() : this.setState(prevState => ({ time: prevState.time - 1}))
    }

    //
    startTimer = () => { 
        this.setState ({
            status: this.props.statuses[0].name,
            playing: true,
            interval: setInterval(this.timer,1000),
        })
    }

    //work well but only when timer is playing, failed when timer is paused
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
 
    //
    pauseTimer = () => { 
        if (this.state.playing){
            this.stopTimer() 
            this.setState({
                status:this.props.statuses[1].name,
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

    render() {
      return (
        <FlexLayout style={sharedStyles.wrapperFlexSpaceBetween} >
            <HeaderBar screenName='Pomodoro Timer' rightIcon = 'settings' rightFunc = {() => this.setSettingsVisible(!this.state.settingsVisible)} leftIcon = 'settings' leftFunc = {() => this.setSettingsVisible(!this.state.settingsVisible)} />
            <View>
                <Text>Dodaj zadanie</Text>
            </View>
            <View style = {sharedStyles.wrapperFlexCenter}>
                <View style={styles.timer}>
                    <Text>Pomodoro Timer!</Text>
                    <Text>{this.state.type.name}</Text>

                    <Pressable
                    onPress={() => this.setSettingsVisible(!this.state.settingsVisible)}>
                        <Text style={styles.timerValue}>{formatTime(this.state.time)} </Text>
                    </Pressable>

                    <Text>{strings("timerIntervalRound")}{this.state.countInterval}</Text>
                </View>
                <ControlsButton
                start = {this.startTimer}
                pause= {this.pauseTimer}
                skip = {this.skipTimer}
                status = {this.state.status}>    
                </ControlsButton>
            </View>

            <Modal 
            animationType="slide"
            transparent={true}
            visible={this.state.settingsVisible}
            onRequestClose={() => {
            this.setSettingsVisible(!this.state.settingsVisible);}}>
                    <View style={[sharedStyles.wrapperFlexCenter,styles.settingsModal]}>
                        <HeaderBar rightIcon='exit' />
                        <View style={styles.inputSettings}>
                            <InLineLayout>
                                <Text>Time Pomodoro</Text>
                            </InLineLayout>
                        </View>
                    </View>
            </Modal>
        </FlexLayout>
      );
    }
  }
